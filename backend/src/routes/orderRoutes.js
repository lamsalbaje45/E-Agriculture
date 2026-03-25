import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { buildOrderController } from "../controllers/orderController.js";

export default function orderRoutes(io) {
  const router = express.Router();
  const controller = buildOrderController(io);

  router.get("/", authenticate, controller.listOrders);
  router.post("/", authenticate, authorize("buyer"), controller.createOrder);
  router.put("/:id/status", authenticate, authorize("farmer", "admin"), controller.updateOrderStatus);

  return router;
}
