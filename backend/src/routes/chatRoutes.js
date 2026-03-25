import express from "express";
import { authenticate } from "../middleware/auth.js";
import { buildChatController } from "../controllers/chatController.js";

export default function chatRoutes(io) {
  const router = express.Router();
  const controller = buildChatController(io);

  router.get("/conversations", authenticate, controller.listConversations);
  router.get("/:userId", authenticate, controller.listMessages);
  router.post("/", authenticate, controller.createMessage);

  return router;
}
