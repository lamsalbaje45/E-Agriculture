import { query } from "../config/db.js";
import { getSocketId } from "./socketStore.js";

export async function createNotification(io, userId, title, body, type = "general") {
  const result = await query(
    "INSERT INTO notifications (user_id, title, body, type) VALUES (?, ?, ?, ?)",
    [userId, title, body, type]
  );

  const notification = {
    id: result.insertId,
    user_id: userId,
    title,
    body,
    type,
    is_read: 0,
    created_at: new Date().toISOString(),
  };

  const socketId = getSocketId(userId);
  if (socketId) {
    io.to(socketId).emit("notification:new", notification);
  }

  return notification;
}
