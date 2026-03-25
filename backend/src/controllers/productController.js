import { query } from "../config/db.js";

export async function listProducts(req, res, next) {
  try {
    const { region, type, search } = req.query;
    const conditions = [];
    const params = [];

    if (region) {
      conditions.push("u.region = ?");
      params.push(region);
    }

    if (type) {
      conditions.push("p.product_type = ?");
      params.push(type);
    }

    if (search) {
      conditions.push("(p.name LIKE ? OR p.description LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const products = await query(
      `SELECT p.*, u.full_name AS farmer_name, u.region AS farmer_region, u.address AS farmer_address, u.latitude AS farmer_latitude, u.longitude AS farmer_longitude
       FROM products p
       JOIN users u ON u.id = p.farmer_id
       ${whereClause}
       ORDER BY p.created_at DESC`,
      params
    );

    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const rows = await query(
      `SELECT p.*, u.full_name AS farmer_name, u.region AS farmer_region, u.address AS farmer_address, u.latitude AS farmer_latitude, u.longitude AS farmer_longitude
       FROM products p
       JOIN users u ON u.id = p.farmer_id
       WHERE p.id = ?`,
      [req.params.id]
    );

    const product = rows[0];
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const { name, description, productType, price, quantity, unit, region, imageUrl } = req.body;

    const result = await query(
      `INSERT INTO products (farmer_id, name, description, product_type, price, quantity, unit, region, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, name, description || null, productType, price, quantity, unit, region, imageUrl || null]
    );

    const rows = await query("SELECT * FROM products WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const productRows = await query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    const product = productRows[0];

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (req.user.role === "farmer" && product.farmer_id !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own products." });
    }

    const { name, description, productType, price, quantity, unit, region, imageUrl } = req.body;

    await query(
      `UPDATE products
       SET name = ?, description = ?, product_type = ?, price = ?, quantity = ?, unit = ?, region = ?, image_url = ?
       WHERE id = ?`,
      [name, description || null, productType, price, quantity, unit, region, imageUrl || null, req.params.id]
    );

    const rows = await query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const productRows = await query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    const product = productRows[0];

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (req.user.role === "farmer" && product.farmer_id !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own products." });
    }

    await query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    next(error);
  }
}
