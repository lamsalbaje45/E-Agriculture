import express from "express";
import { authenticate } from "../middleware/auth.js";
import { initiatePayment, verifyEsewaPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/initiate", authenticate, initiatePayment);
router.post("/esewa/verify", authenticate, verifyEsewaPayment);

export default router;
