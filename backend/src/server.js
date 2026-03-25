import dotenv from "dotenv";
import { server } from "./app.js";
import { pool, query } from "./config/db.js";

dotenv.config();

const port = Number(process.env.PORT || 5000);

async function ensureLocationColumns() {
  const columns = await query(
    `SELECT COLUMN_NAME
     FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME IN ('latitude', 'longitude')`
  );

  const existingColumnNames = new Set(columns.map((item) => item.COLUMN_NAME));

  if (!existingColumnNames.has("latitude")) {
    await query("ALTER TABLE users ADD COLUMN latitude DECIMAL(10, 7) NULL AFTER address");
  }

  if (!existingColumnNames.has("longitude")) {
    await query("ALTER TABLE users ADD COLUMN longitude DECIMAL(10, 7) NULL AFTER latitude");
  }
}

async function start() {
  try {
    await pool.getConnection();
    await ensureLocationColumns();
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

start();
