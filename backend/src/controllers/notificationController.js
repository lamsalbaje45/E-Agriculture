import { query } from "../config/db.js";

export async function listNotifications(req, res, next) {
  try {
    const notifications = await query(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(notifications);
  } catch (error) {
    next(error);
  }
}

export async function markNotificationRead(req, res, next) {
  try {
    await query("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?", [
      req.params.id,
      req.user.id,
    ]);
    res.json({ message: "Notification marked as read." });
  } catch (error) {
    next(error);
  }
}
