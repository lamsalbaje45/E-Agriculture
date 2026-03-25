import { query } from "../config/db.js";
import { getSocketId } from "../utils/socketStore.js";
import { createNotification } from "../utils/notifications.js";

export function buildChatController(io) {
  return {
    async listConversations(req, res, next) {
      try {
        const conversations = await query(
          `SELECT
            m.sender_id,
            m.receiver_id,
            m.created_at AS last_message_at,
            m.message AS last_message,
            CASE WHEN m.sender_id = ? THEN receiver.full_name ELSE sender.full_name END AS contact_name,
            CASE WHEN m.sender_id = ? THEN m.receiver_id ELSE m.sender_id END AS contact_id
           FROM messages m
           JOIN (
             SELECT MAX(id) AS latest_id
             FROM messages
             WHERE sender_id = ? OR receiver_id = ?
             GROUP BY LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id)
           ) latest ON latest.latest_id = m.id
           JOIN users sender ON sender.id = m.sender_id
           JOIN users receiver ON receiver.id = m.receiver_id
           ORDER BY m.created_at DESC`,
          [req.user.id, req.user.id, req.user.id, req.user.id]
        );

        res.json(conversations);
      } catch (error) {
        next(error);
      }
    },

    async listMessages(req, res, next) {
      try {
        const messages = await query(
          `SELECT *
           FROM messages
           WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
           ORDER BY created_at ASC`,
          [req.user.id, req.params.userId, req.params.userId, req.user.id]
        );

        res.json(messages);
      } catch (error) {
        next(error);
      }
    },

    async createMessage(req, res, next) {
      try {
        const { receiverId, message } = req.body;

        const result = await query(
          "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)",
          [req.user.id, receiverId, message]
        );

        const rows = await query("SELECT * FROM messages WHERE id = ?", [result.insertId]);
        const chatMessage = rows[0];

        const receiverSocket = getSocketId(receiverId);
        if (receiverSocket) {
          io.to(receiverSocket).emit("chat:message", chatMessage);
        }

        await createNotification(io, receiverId, "New message", "You received a new chat message.", "message");

        res.status(201).json(chatMessage);
      } catch (error) {
        next(error);
      }
    },
  };
}
