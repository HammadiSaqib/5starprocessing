const mysql = require('mysql2/promise');

(async function () {
  try {
    const cfg = {
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || '5starprocessing_db',
    };
    const conn = await mysql.createConnection(cfg);
    await conn.query(
      "CREATE TABLE IF NOT EXISTS submit (id INT AUTO_INCREMENT PRIMARY KEY, application_id INT NOT NULL, data JSON NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE KEY uniq_app (application_id)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
    );
    const [hasOld] = await conn.query(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'application_sections'"
    );
    if (hasOld.length) {
      const [rows] = await conn.query(
        "SELECT application_id, section, data FROM application_sections ORDER BY application_id"
      );
      const merged = {};
      for (const r of rows) {
        const appId = Number(r.application_id);
        const section = String(r.section);
        const data = r.data;
        merged[appId] = merged[appId] || {};
        merged[appId][section] = data;
      }
      for (const appId of Object.keys(merged)) {
        const payload = JSON.stringify(merged[appId]);
        await conn.query(
          "INSERT INTO submit (application_id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)",
          [Number(appId), payload]
        );
      }
      await conn.query("DROP TABLE application_sections");
      console.log("Migrated application_sections -> submit");
    } else {
      console.log("No application_sections table to migrate");
    }
    const [subs] = await conn.query("SELECT COUNT(*) AS c FROM submit");
    console.log("submit rows:", subs[0].c);
    await conn.end();
    process.exit(0);
  } catch (e) {
    console.error("DB migrate error", e);
    process.exit(1);
  }
})();
