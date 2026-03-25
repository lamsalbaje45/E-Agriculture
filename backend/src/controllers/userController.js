import { query } from "../config/db.js";

export async function listUsers(req, res, next) {
  try {
    const users = await query(
      "SELECT id, full_name, email, role, phone, region, address, latitude, longitude, photo_url, created_at FROM users ORDER BY created_at DESC"
    );
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const currentRows = await query(
      "SELECT id, photo_url FROM users WHERE id = ?",
      [req.user.id]
    );
    const currentUser = currentRows[0];

    const { fullName, phone, region, address, latitude, longitude, removePhoto } = req.body;
    let nextPhotoUrl = currentUser?.photo_url || null;
    const parsedLatitude = latitude ? Number(latitude) : null;
    const parsedLongitude = longitude ? Number(longitude) : null;

    if (latitude && (Number.isNaN(parsedLatitude) || parsedLatitude < -90 || parsedLatitude > 90)) {
      return res.status(400).json({ message: "Latitude must be a valid number between -90 and 90." });
    }

    if (longitude && (Number.isNaN(parsedLongitude) || parsedLongitude < -180 || parsedLongitude > 180)) {
      return res.status(400).json({ message: "Longitude must be a valid number between -180 and 180." });
    }

    if (String(removePhoto).toLowerCase() === "true") {
      nextPhotoUrl = null;
    }

    if (req.file) {
      nextPhotoUrl = `/uploads/profiles/${req.file.filename}`;
    }

    await query(
      "UPDATE users SET full_name = ?, phone = ?, region = ?, address = ?, latitude = ?, longitude = ?, photo_url = ? WHERE id = ?",
      [fullName, phone || null, region || null, address || null, parsedLatitude, parsedLongitude, nextPhotoUrl, req.user.id]
    );

    const rows = await query(
      "SELECT id, full_name, email, role, phone, region, address, latitude, longitude, photo_url, created_at FROM users WHERE id = ?",
      [req.user.id]
    );

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "User removed successfully." });
  } catch (error) {
    next(error);
  }
}
