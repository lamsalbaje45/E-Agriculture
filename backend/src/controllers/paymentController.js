import crypto from "crypto";
import { query } from "../config/db.js";

const ESEWA_FORM_URL = process.env.ESEWA_FORM_URL || "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
const ESEWA_STATUS_CHECK_URL =
  process.env.ESEWA_STATUS_CHECK_URL || "https://rc.esewa.com.np/api/epay/transaction/status/";
const ESEWA_PRODUCT_CODE = process.env.ESEWA_PRODUCT_CODE || "EPAYTEST";
const ESEWA_SECRET_KEY = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";

function toMoney(value) {
  return Number(value || 0).toFixed(2);
}

function generateSignature(totalAmount, transactionUuid, productCode) {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  return crypto.createHmac("sha256", ESEWA_SECRET_KEY).update(message).digest("base64");
}

function parseEsewaData(data) {
  const decoded = Buffer.from(data, "base64").toString("utf-8");
  return JSON.parse(decoded);
}

function getOrderIdFromTransactionUuid(transactionUuid) {
  const match = /^ORD-(\d+)-\d+$/i.exec(String(transactionUuid || ""));
  if (!match) {
    return null;
  }

  return Number(match[1]);
}

export async function initiatePayment(req, res, next) {
  try {
    const { provider, orderId, amount } = req.body;

    const normalized = String(provider || "").toLowerCase();
    if (normalized !== "esewa") {
      return res.status(400).json({ message: "Provider must be eSewa." });
    }

    const orders = await query("SELECT * FROM orders WHERE id = ? AND buyer_id = ?", [orderId, req.user.id]);
    const order = orders[0];

    if (!order) {
      return res.status(404).json({ message: "Order not found for this buyer." });
    }

    const totalAmount = toMoney(amount || order.total_price);
    const transactionUuid = `ORD-${order.id}-${Date.now()}`;
    const signedFieldNames = "total_amount,transaction_uuid,product_code";
    const signature = generateSignature(totalAmount, transactionUuid, ESEWA_PRODUCT_CODE);
    const successUrl = `${process.env.CLIENT_URL}/payments/esewa/success`;
    const failureUrl = `${process.env.CLIENT_URL}/payments/esewa/failure`;

    await query("UPDATE orders SET payment_method = ?, payment_status = 'pending' WHERE id = ?", [normalized, order.id]);

    return res.json({
      provider: normalized,
      orderId: order.id,
      amount: totalAmount,
      message: "eSewa payment initiated.",
      esewa: {
        action: ESEWA_FORM_URL,
        fields: {
          amount: totalAmount,
          tax_amount: "0",
          total_amount: totalAmount,
          transaction_uuid: transactionUuid,
          product_code: ESEWA_PRODUCT_CODE,
          product_service_charge: "0",
          product_delivery_charge: "0",
          success_url: successUrl,
          failure_url: failureUrl,
          signed_field_names: signedFieldNames,
          signature,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyEsewaPayment(req, res, next) {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ message: "Missing eSewa response payload." });
    }

    const payload = parseEsewaData(data);
    const { total_amount: totalAmount, transaction_uuid: transactionUuid, product_code: productCode, status } = payload;
    const orderId = getOrderIdFromTransactionUuid(transactionUuid);

    if (!orderId) {
      return res.status(400).json({ message: "Invalid transaction reference." });
    }

    const orders = await query("SELECT * FROM orders WHERE id = ? AND buyer_id = ?", [orderId, req.user.id]);
    const order = orders[0];

    if (!order) {
      return res.status(404).json({ message: "Order not found for this buyer." });
    }

    if (String(productCode || "") !== ESEWA_PRODUCT_CODE) {
      await query("UPDATE orders SET payment_status = 'failed' WHERE id = ?", [order.id]);
      return res.status(400).json({ message: "Unexpected eSewa product code." });
    }

    const expectedSignature = generateSignature(toMoney(totalAmount), String(transactionUuid), String(productCode));
    if (expectedSignature !== payload.signature) {
      await query("UPDATE orders SET payment_status = 'failed' WHERE id = ?", [order.id]);
      return res.status(400).json({ message: "Signature validation failed." });
    }

    const statusUrl = new URL(ESEWA_STATUS_CHECK_URL);
    statusUrl.searchParams.set("product_code", String(productCode));
    statusUrl.searchParams.set("total_amount", toMoney(totalAmount));
    statusUrl.searchParams.set("transaction_uuid", String(transactionUuid));

    const statusResponse = await fetch(statusUrl.toString(), { method: "GET" });
    if (!statusResponse.ok) {
      await query("UPDATE orders SET payment_status = 'failed' WHERE id = ?", [order.id]);
      return res.status(502).json({ message: "Unable to confirm payment status with eSewa." });
    }

    const statusResult = await statusResponse.json();
    const paymentCompleted = status === "COMPLETE" && statusResult.status === "COMPLETE";

    await query("UPDATE orders SET payment_method = 'esewa', payment_status = ? WHERE id = ?", [
      paymentCompleted ? "paid" : "failed",
      order.id,
    ]);

    return res.json({
      orderId: order.id,
      paymentStatus: paymentCompleted ? "paid" : "failed",
      esewaStatus: statusResult.status,
    });
  } catch (error) {
    next(error);
  }
}
