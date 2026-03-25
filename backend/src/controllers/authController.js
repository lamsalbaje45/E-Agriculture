import bcrypt from "bcryptjs";
import { query } from "../config/db.js";
import { signToken } from "../utils/tokens.js";

export async function register(req, res, next) {
  try {
    const { fullName, email, password, role, phone, region, address, latitude, longitude, photoUrl } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ message: "Full name, email, password, and role are required." });
    }

    if (!["farmer", "buyer"].includes(role)) {
      return res.status(400).json({ message: "You can only register as a buyer or farmer." });
    }

    const existing = await query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const parsedLatitude = latitude ? Number(latitude) : null;
    const parsedLongitude = longitude ? Number(longitude) : null;

    if (latitude && (Number.isNaN(parsedLatitude) || parsedLatitude < -90 || parsedLatitude > 90)) {
      return res.status(400).json({ message: "Latitude must be a valid number between -90 and 90." });
    }

    if (longitude && (Number.isNaN(parsedLongitude) || parsedLongitude < -180 || parsedLongitude > 180)) {
      return res.status(400).json({ message: "Longitude must be a valid number between -180 and 180." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO users (full_name, email, password_hash, role, phone, region, address, latitude, longitude, photo_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        email,
        passwordHash,
        role,
        phone || null,
        region || null,
        address || null,
        parsedLatitude,
        parsedLongitude,
        photoUrl || null,
      ]
    );

    const rows = await query(
      "SELECT id, full_name, email, role, phone, region, address, latitude, longitude, photo_url, created_at FROM users WHERE id = ?",
      [result.insertId]
    );

    const user = rows[0];

    return res.status(201).json({
      token: signToken(user),
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const users = await query("SELECT * FROM users WHERE email = ?", [email]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const safeUser = {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      region: user.region,
      address: user.address,
      latitude: user.latitude,
      longitude: user.longitude,
      photo_url: user.photo_url,
      created_at: user.created_at,
    };

    return res.json({
      token: signToken(safeUser),
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(req, res, next) {
  try {
    const rows = await query(
      "SELECT id, full_name, email, role, phone, region, address, latitude, longitude, photo_url, created_at FROM users WHERE id = ?",
      [req.user.id]
    );

    return res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}
