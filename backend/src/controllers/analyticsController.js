import { query } from "../config/db.js";

export async function getAnalytics(req, res, next) {
  try {
    const baseStats = {};

    if (req.user.role === "admin") {
      const [users] = await Promise.all([query("SELECT role, COUNT(*) AS total FROM users GROUP BY role")]);
      const products = await query("SELECT COUNT(*) AS total FROM products");
      const orders = await query("SELECT COUNT(*) AS total, SUM(total_price) AS revenue FROM orders");

      baseStats.users = users;
      baseStats.products = products[0];
      baseStats.orders = orders[0];
    }

    if (req.user.role === "farmer") {
      const farmerProducts = await query("SELECT COUNT(*) AS total FROM products WHERE farmer_id = ?", [req.user.id]);
      const farmerOrders = await query(
        `SELECT COUNT(*) AS total_orders, SUM(o.total_price) AS revenue
         FROM orders o
         JOIN products p ON p.id = o.product_id
         WHERE p.farmer_id = ?`,
        [req.user.id]
      );

      baseStats.products = farmerProducts[0];
      baseStats.orders = farmerOrders[0];
    }

    if (req.user.role === "buyer") {
      const buyerOrders = await query(
        "SELECT COUNT(*) AS total_orders, SUM(total_price) AS spending FROM orders WHERE buyer_id = ?",
        [req.user.id]
      );

      baseStats.orders = buyerOrders[0];
    }

    res.json(baseStats);
  } catch (error) {
    next(error);
  }
}
