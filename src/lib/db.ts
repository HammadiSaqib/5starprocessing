import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";

const config = {
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "5starprocessing_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
} as const;

console.log(
  `DB connection host=${config.host} port=${config.port} user=${config.user} db=${config.database}`
);

async function getConnection() {
  return mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
  });
}

export async function ensureUsersTable() {
  const conn = await getConnection();
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } finally {
    await conn.end();
  }
}

export interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
  role?: string;
  referral_slug?: string;
  referred_by?: number;
}

export async function findUserByEmail(email: string) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<UserRow[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0] || null;
  } finally {
    await conn.end();
  }
}

export async function createUser(name: string, email: string, passwordHash: string, referralSlug?: string, referredBy?: number) {
  const conn = await getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO users (name, email, password_hash, referral_slug, referred_by) VALUES (?, ?, ?, ?, ?)",
      [name, email, passwordHash, referralSlug || null, referredBy || null]
    );
    const insert = result as ResultSetHeader;
    return insert.insertId;
  } finally {
    await conn.end();
  }
}

export async function findUserByReferralSlug(slug: string) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<UserRow[]>(
      "SELECT * FROM users WHERE referral_slug = ?",
      [slug]
    );
    return rows[0] || null;
  } finally {
    await conn.end();
  }
}

export async function updateReferralSlug(userId: number, slug: string) {
  const conn = await getConnection();
  try {
    // Check if slug is taken by another user
    const [existing] = await conn.query<RowDataPacket[]>(
      "SELECT id FROM users WHERE referral_slug = ? AND id != ?",
      [slug, userId]
    );
    if (existing.length > 0) return false;

    await conn.query(
      "UPDATE users SET referral_slug = ? WHERE id = ?",
      [slug, userId]
    );
    return true;
  } finally {
    await conn.end();
  }
}

export async function findUserById(id: number) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<UserRow[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  } finally {
    await conn.end();
  }
}

export async function ensurePortalSchema() {
  const conn = await getConnection();
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        status VARCHAR(32) NOT NULL DEFAULT 'prequal',
        tag VARCHAR(32) DEFAULT NULL,
        industry VARCHAR(100) DEFAULT NULL,
        processing_current TINYINT(1) DEFAULT NULL,
        monthly_volume DECIMAL(12,2) DEFAULT NULL,
        us_citizen TINYINT(1) DEFAULT NULL,
        active_us_bank TINYINT(1) DEFAULT NULL,
        fees_payer VARCHAR(32) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS video_progress (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        video_id VARCHAR(64) NOT NULL,
        progress_percent INT NOT NULL DEFAULT 0,
        completed TINYINT(1) NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_user_video (user_id, video_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS submit (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id INT NOT NULL,
        data JSON NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_app (application_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        application_id INT NOT NULL,
        doc_type VARCHAR(64) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        status VARCHAR(32) NOT NULL DEFAULT 'uploaded',
        reviewer_user_id INT NULL,
        reviewed_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS document_audits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        document_id INT NOT NULL,
        actor_user_id INT NOT NULL,
        action VARCHAR(32) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        application_id INT NULL,
        type VARCHAR(16) NOT NULL,
        reason VARCHAR(32) NOT NULL,
        scheduled_at TIMESTAMP NULL,
        status VARCHAR(16) NOT NULL DEFAULT 'pending',
        attempts INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    const [phoneCol] = await conn.query<RowDataPacket[]>(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'phone'"
    );
    if (!phoneCol.length) {
      await conn.query("ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL");
    }
    const [roleCol] = await conn.query<RowDataPacket[]>(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'"
    );
    if (!roleCol.length) {
      await conn.query("ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'applicant'");
    }
    const [statusCol] = await conn.query<RowDataPacket[]>(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'status'"
    );
    if (!statusCol.length) {
      await conn.query("ALTER TABLE users ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'Pending'");
    }
    const [statusReasonCol] = await conn.query<RowDataPacket[]>(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'status_reason'"
    );
    if (!statusReasonCol.length) {
      await conn.query("ALTER TABLE users ADD COLUMN status_reason TEXT NULL");
    }
    const [refSlugCol] = await conn.query<RowDataPacket[]>(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'referral_slug'"
    );
    if (!refSlugCol.length) {
      await conn.query("ALTER TABLE users ADD COLUMN referral_slug VARCHAR(128) UNIQUE NULL");
    }
    const [referredByCol] = await conn.query<RowDataPacket[]>(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'referred_by'"
    );
    if (!referredByCol.length) {
      await conn.query("ALTER TABLE users ADD COLUMN referred_by INT NULL");
    }
    const [hasOld] = await conn.query<RowDataPacket[]>(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'application_sections'"
    );
    if (hasOld.length) {
      const [rows] = await conn.query<RowDataPacket[]>(
        "SELECT application_id, section, data FROM application_sections ORDER BY application_id"
      );
      const merged: Record<number, Record<string, unknown>> = {};
      for (const r of rows) {
        const appId = Number(r.application_id);
        const section = String(r.section);
        const data = r.data;
        if (!merged[appId]) merged[appId] = {};
        merged[appId][section] = data;
      }
      for (const appId of Object.keys(merged)) {
        const payload = JSON.stringify(merged[Number(appId)]);
        await conn.query(
          "INSERT INTO submit (application_id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)",
          [Number(appId), payload]
        );
      }
      await conn.query("DROP TABLE application_sections");
    }
  } finally {
    await conn.end();
  }
}

export async function upsertUserAuto(name: string, email: string, phone: string) {
  await ensureUsersTable();
  await ensurePortalSchema();
  const existing = await findUserByEmail(email);
  if (existing) {
    const conn = await getConnection();
    try {
      await conn.query("UPDATE users SET name = ?, phone = ? WHERE id = ?", [name, phone, existing.id]);
    } finally {
      await conn.end();
    }
    return existing.id;
  }
  const bcrypt = (await import("bcrypt")).default;
  const placeholder = await bcrypt.hash(String(Math.random()), 10);
  const conn = await getConnection();
  try {
    const [res] = await conn.query<ResultSetHeader>(
      "INSERT INTO users (name, email, password_hash, phone, role) VALUES (?, ?, ?, ?, 'applicant')",
      [name, email, placeholder, phone]
    );
    return res.insertId;
  } finally {
    await conn.end();
  }
}

export async function getOrCreateApplication(userId: number) {
  await ensurePortalSchema();
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>("SELECT * FROM applications WHERE user_id = ? LIMIT 1", [userId]);
    if (rows.length) return rows[0];
    const [res] = await conn.query<ResultSetHeader>(
      "INSERT INTO applications (user_id, status) VALUES (?, 'prequal')",
      [userId]
    );
    const id = res.insertId;
    const [rows2] = await conn.query<RowDataPacket[]>("SELECT * FROM applications WHERE id = ?", [id]);
    return rows2[0];
  } finally {
    await conn.end();
  }
}

export async function savePrequal(applicationId: number, data: {
  industry: string;
  processing_current: boolean;
  monthly_volume: number;
  us_citizen: boolean;
  active_us_bank: boolean;
  fees_payer: string;
}) {
  const tag =
    data.us_citizen && data.active_us_bank && ((data.processing_current) || data.monthly_volume >= 5000) && data.fees_payer === "merchant"
      ? "Qualified"
      : (data.us_citizen && data.active_us_bank && (true))
        ? "Conditional"
        : "Disqualified";
  const status = tag === "Disqualified" ? "disqualified" : "video";
  const conn = await getConnection();
  try {
    await conn.query(
      "UPDATE applications SET industry = ?, processing_current = ?, monthly_volume = ?, us_citizen = ?, active_us_bank = ?, fees_payer = ?, tag = ?, status = ? WHERE id = ?",
      [
        data.industry,
        data.processing_current ? 1 : 0,
        data.monthly_volume,
        data.us_citizen ? 1 : 0,
        data.active_us_bank ? 1 : 0,
        data.fees_payer,
        tag,
        status,
        applicationId,
      ]
    );
    return { tag, status };
  } finally {
    await conn.end();
  }
}

export async function setVideoProgress(userId: number, videoId: string, percent: number) {
  const completed = percent >= 90 ? 1 : 0;
  const conn = await getConnection();
  try {
    await conn.query(
      "INSERT INTO video_progress (user_id, video_id, progress_percent, completed) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE progress_percent = VALUES(progress_percent), completed = VALUES(completed)"
      , [userId, videoId, Math.min(100, Math.max(0, Math.round(percent))), completed]
    );
    if (completed) {
      await conn.query(
        "UPDATE applications SET status = 'application' WHERE user_id = ? AND tag <> 'Disqualified' AND status = 'video'",
        [userId]
      );
    }
  } finally {
    await conn.end();
  }
}

export async function saveApplicationSection(applicationId: number, section: string, data: unknown) {
  const conn = await getConnection();
  try {
    await conn.query(
      "INSERT INTO submit (application_id, data) VALUES (?, JSON_OBJECT()) ON DUPLICATE KEY UPDATE application_id = application_id",
      [applicationId]
    );
    await conn.query(
      "UPDATE submit SET data = JSON_MERGE_PATCH(COALESCE(data, JSON_OBJECT()), ?) WHERE application_id = ?",
      [JSON.stringify({ [section]: data }), applicationId]
    );
  } finally {
    await conn.end();
  }
}

export async function markApplicationSubmitted(applicationId: number) {
  const conn = await getConnection();
  try {
    await conn.query("UPDATE applications SET status = 'under_review' WHERE id = ?", [applicationId]);
  } finally {
    await conn.end();
  }
}

export async function createDocument(applicationId: number, docType: string, filePath: string) {
  const conn = await getConnection();
  try {
    const [res] = await conn.query<ResultSetHeader>(
      "INSERT INTO documents (application_id, doc_type, file_path, status) VALUES (?, ?, ?, 'uploaded')",
      [applicationId, docType, filePath]
    );
    const docId = res.insertId;
    await conn.query("INSERT INTO document_audits (document_id, actor_user_id, action) VALUES (?, ?, 'uploaded')", [docId, 0]);
    return docId;
  } finally {
    await conn.end();
  }
}

export async function updateDocumentStatus(documentId: number, reviewerUserId: number, status: string) {
  const conn = await getConnection();
  try {
    await conn.query(
      "UPDATE documents SET status = ?, reviewer_user_id = ?, reviewed_at = CURRENT_TIMESTAMP WHERE id = ?",
      [status, reviewerUserId, documentId]
    );
    await conn.query(
      "INSERT INTO document_audits (document_id, actor_user_id, action) VALUES (?, ?, ?)",
      [documentId, reviewerUserId, status]
    );
    if (status === "needs_resubmission") {
      const [rows] = await conn.query<RowDataPacket[]>("SELECT application_id FROM documents WHERE id = ?", [documentId]);
      const appId = rows[0]?.application_id as number | undefined;
      if (appId) {
        const [appRows] = await conn.query<RowDataPacket[]>("SELECT user_id FROM applications WHERE id = ?", [appId]);
        const userId = appRows[0]?.user_id as number | undefined;
        if (userId) {
          await conn.query(
            "INSERT INTO notifications (user_id, application_id, type, reason, scheduled_at) VALUES (?, ?, 'email', 'missing_documents', NOW())",
            [userId, appId]
          );
        }
        await conn.query("UPDATE applications SET status = 'resubmission' WHERE id = ?", [appId]);
      }
    }
    if (status === "approved") {
      const [rows] = await conn.query<RowDataPacket[]>("SELECT application_id FROM documents WHERE id = ?", [documentId]);
      const appId = rows[0]?.application_id as number | undefined;
      if (appId) {
        const [appRows] = await conn.query<RowDataPacket[]>("SELECT user_id FROM applications WHERE id = ?", [appId]);
        const userId = appRows[0]?.user_id as number | undefined;
        if (userId) {
          await conn.query(
            "INSERT INTO notifications (user_id, application_id, type, reason, scheduled_at) VALUES (?, ?, 'email', 'approved', NOW())",
            [userId, appId]
          );
        }
        await conn.query("UPDATE applications SET status = 'approved' WHERE id = ?", [appId]);
      }
    }
  } finally {
    await conn.end();
  }
}

export async function queueNotification(userId: number, applicationId: number | null, type: string, reason: string, scheduleInHours = 24) {
  const conn = await getConnection();
  try {
    await conn.query(
      "INSERT INTO notifications (user_id, application_id, type, reason, scheduled_at) VALUES (?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL ? HOUR))",
      [userId, applicationId, type, reason, scheduleInHours]
    );
  } finally {
    await conn.end();
  }
}

const db = { getConnection };
export default db;

export async function getApplicationStatusForUser(userId: number) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT id, status, tag FROM applications WHERE user_id = ? LIMIT 1",
      [userId]
    );
    return rows[0] || null;
  } finally {
    await conn.end();
  }
}

export async function listDocumentsForApplication(applicationId: number) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT id, doc_type, file_path, status, reviewed_at, reviewer_user_id FROM documents WHERE application_id = ? ORDER BY id DESC",
      [applicationId]
    );
    return rows;
  } finally {
    await conn.end();
  }
}

export async function getVideoProgress(userId: number, videoId: string) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT progress_percent AS percent, completed FROM video_progress WHERE user_id = ? AND video_id = ? LIMIT 1",
      [userId, videoId]
    );
    const row = rows[0] || null;
    return row ? { percent: Number(row.percent || 0), completed: !!row.completed } : { percent: 0, completed: false };
  } finally {
    await conn.end();
  }
}
