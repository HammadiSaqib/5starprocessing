
const mysql = require('mysql2/promise');
// require('dotenv').config({ path: '.env.local' });

const config = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "5starprocessing_db",
};

async function migrate() {
  console.log(`Connecting to ${config.database}...`);
  const conn = await mysql.createConnection(config);
  
  try {
    console.log("Checking for custom_support_number column...");
    const [columns] = await conn.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'custom_support_number'
    `, [config.database]);

    if (columns.length === 0) {
      console.log("Adding custom_support_number column...");
      await conn.query(`
        ALTER TABLE users
        ADD COLUMN custom_support_number VARCHAR(50) NULL DEFAULT NULL
      `);
      console.log("Column added successfully.");
    } else {
      console.log("Column custom_support_number already exists.");
    }
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await conn.end();
  }
}

migrate();
