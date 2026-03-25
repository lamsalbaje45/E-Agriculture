import { query } from "../config/db.js";
import { createNotification } from "../utils/notifications.js";

export function buildOrderController(io) {
  return {
    async listOrders(req, res, next) {
      try {
        let sql = `
          SELECT o.*, p.name AS product_name, p.region AS product_region, p.farmer_id, u.full_name AS buyer_name
          FROM orders o
          JOIN products p ON p.id = o.product_id
          JOIN users u ON u.id = o.buyer_id
        `;
        const params = [];

        if (req.user.role === "buyer") {
          sql += " WHERE o.buyer_id = ?";
          params.push(req.user.id);
        } else if (req.user.role === "farmer") {
          sql += " WHERE p.farmer_id = ?";
          params.push(req.user.id);
        }

        sql += " ORDER BY o.created_at DESC";
        const orders = await query(sql, params);
        res.json(orders);
      } catch (error) {
        next(error);
      }
    },

    async createOrder(req, res, next) {
      try {
        const { productId, quantity, paymentMethod } = req.body;
        const products = await query("SELECT * FROM products WHERE id = ?", [productId]);
        const product = products[0];

        if (!product) {
          return res.status(404).json({ message: "Product not found." });
        }

        const requestedQuantity = Number(quantity);
        if (!requestedQuantity || requestedQuantity <= 0) {
          return res.status(400).json({ message: "Please enter a valid quantity." });
        }

        if (requestedQuantity > Number(product.quantity)) {
          return res.status(400).json({ message: "Requested quantity exceeds available stock." });
        }

        const totalPrice = Number(product.price) * requestedQuantity;

        const result = await query(
          `INSERT INTO orders (product_id, buyer_id, quantity, total_price, payment_method, payment_status, order_status)
           VALUES (?, ?, ?, ?, ?, 'pending', 'pending')`,
          [productId, req.user.id, requestedQuantity, totalPrice, paymentMethod || "cod"]
        );

        const rows = await query("SELECT * FROM orders WHERE id = ?", [result.insertId]);
        await createNotification(
          io,
          product.farmer_id,
          "New order received",
          `A buyer placed an order for ${product.name}.`,
          "order"
        );

        res.status(201).json(rows[0]);
      } catch (error) {
        next(error);
      }
    },

    async updateOrderStatus(req, res, next) {
      try {
        const { status, paymentStatus } = req.body;
        const orders = await query(
          `SELECT o.*, p.id AS product_id, p.quantity AS available_quantity, p.farmer_id, p.name AS product_name
           FROM orders o
           JOIN products p ON p.id = o.product_id
           WHERE o.id = ?`,
          [req.params.id]
        );
        const order = orders[0];

        if (!order) {
          return res.status(404).json({ message: "Order not found." });
        }

        if (req.user.role === "farmer" && order.farmer_id !== req.user.id) {
          return res.status(403).json({ message: "You can only update orders for your own products." });
        }

        const nextStatus = status || order.order_status;
        if (nextStatus === "completed" && order.order_status !== "completed") {
          if (Number(order.quantity) > Number(order.available_quantity)) {
            return res.status(400).json({ message: "Not enough stock available to complete this order." });
          }

          await query("UPDATE products SET quantity = quantity - ? WHERE id = ?", [order.quantity, order.product_id]);
        }

        await query(
          "UPDATE orders SET order_status = ?, payment_status = ? WHERE id = ?",
          [nextStatus, paymentStatus || order.payment_status, req.params.id]
        );

        await createNotification(
          io,
          order.buyer_id,
          "Order updated",
          `Your order for ${order.product_name} is now ${nextStatus}.`,
          "order"
        );

        const rows = await query("SELECT * FROM orders WHERE id = ?", [req.params.id]);
        res.json(rows[0]);
      } catch (error) {
        next(error);
      }
    },
  };
}
