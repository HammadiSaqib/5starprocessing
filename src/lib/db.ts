import mysql, { RowDataPacket, ResultSetHeader } from "mysql2/promise";

const config = {
  host: process.env.MYSQL_HOST || process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
  user: process.env.MYSQL_USER || process.env.DB_USER || "root",
  password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || process.env.DB_DATABASE || "5starprocessing_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
} as const;

console.log(
  `DB connection host=${config.host} port=${config.port} user=${config.user} db=${config.database}`
);

async function getConnection() {
  if (process.env.NODE_ENV === "production" && config.user === "root" && !config.password) {
    throw new Error("DB config invalid: root without password in production");
  }
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
  custom_support_number?: string | null;
  affiliate_status?: string | null;
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
    const [merchantIdCol] = await conn.query<RowDataPacket[]>(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'applications' AND COLUMN_NAME = 'merchant_id'"
    );
    if (!merchantIdCol.length) {
      await conn.query("ALTER TABLE applications ADD COLUMN merchant_id VARCHAR(64) NULL");
    }
    const [trackingIdCol] = await conn.query<RowDataPacket[]>(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'applications' AND COLUMN_NAME = 'tracking_id'"
    );
    if (!trackingIdCol.length) {
      await conn.query("ALTER TABLE applications ADD COLUMN tracking_id VARCHAR(64) NULL");
    }
    await conn.query(`
      CREATE TABLE IF NOT EXISTS support_numbers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        number VARCHAR(64) NOT NULL UNIQUE,
        label VARCHAR(64) NULL,
        active TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS application_them (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`brand-50\` VARCHAR(9) NOT NULL,
        \`brand-100\` VARCHAR(9) NOT NULL,
        \`brand-200\` VARCHAR(9) NOT NULL,
        \`brand-300\` VARCHAR(9) NOT NULL,
        \`brand-400\` VARCHAR(9) NOT NULL,
        \`brand-500\` VARCHAR(9) NOT NULL,
        \`brand-600\` VARCHAR(9) NOT NULL,
        \`brand-700\` VARCHAR(9) NOT NULL,
        \`brand-800\` VARCHAR(9) NOT NULL,
        \`brand-900\` VARCHAR(9) NOT NULL,
        \`brand-950\` VARCHAR(9) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    const [themeRows] = await conn.query<RowDataPacket[]>("SELECT id FROM application_them LIMIT 1");
    if (!themeRows.length) {
      await conn.query(
        "INSERT INTO application_them (`brand-50`, `brand-100`, `brand-200`, `brand-300`, `brand-400`, `brand-500`, `brand-600`, `brand-700`, `brand-800`, `brand-900`, `brand-950`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        ["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"]
      );
    }
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
    const [affStatusCol] = await conn.query<RowDataPacket[]>(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'affiliate_status'"
    );
    if (!affStatusCol.length) {
      await conn.query("ALTER TABLE users ADD COLUMN affiliate_status VARCHAR(20) DEFAULT NULL");
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
    await conn.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        course_url VARCHAR(255),
        thumbnail_url VARCHAR(255),
        product_file_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS course_videos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        video_url VARCHAR(255) NOT NULL,
        position INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_course (course_id),
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } finally {
    await conn.end();
  }
}

export interface Course extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  course_url?: string;
  thumbnail_url?: string;
  product_file_url?: string;
  created_at: string;
  updated_at: string;
  videos?: CourseVideo[];
}

export interface CourseVideo extends RowDataPacket {
  id: number;
  course_id: number;
  title: string;
  video_url: string;
  position: number;
  created_at: string;
  updated_at: string;
}

export async function getAllCourses() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<Course[]>("SELECT * FROM courses ORDER BY created_at DESC");
    return rows;
  } finally {
    await conn.end();
  }
}

export async function getCourseWithVideos(id: number) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<Course[]>("SELECT * FROM courses WHERE id = ?", [id]);
    if (!rows.length) return null;
    const course = rows[0];
    const [videos] = await conn.query<CourseVideo[]>("SELECT * FROM course_videos WHERE course_id = ? ORDER BY position ASC, id ASC", [id]);
    course.videos = videos;
    return course;
  } finally {
    await conn.end();
  }
}

export async function createCourse(course: Omit<Course, 'id' | 'created_at' | 'updated_at' | 'videos'>, videos?: { title: string, video_url: string }[]) {
  const conn = await getConnection();
  try {
    const [result] = await conn.query(
      "INSERT INTO courses (title, description, course_url, thumbnail_url, product_file_url) VALUES (?, ?, ?, ?, ?)",
      [course.title, course.description, course.course_url || null, course.thumbnail_url || null, course.product_file_url || null]
    );
    const insert = result as ResultSetHeader;
    const courseId = insert.insertId;

    if (videos && videos.length > 0) {
      for (let i = 0; i < videos.length; i++) {
        await conn.query(
          "INSERT INTO course_videos (course_id, title, video_url, position) VALUES (?, ?, ?, ?)",
          [courseId, videos[i].title, videos[i].video_url, i]
        );
      }
    }
    
    return courseId;
  } finally {
    await conn.end();
  }
}

export type CourseUpdate = {
  title?: string;
  description?: string;
  course_url?: string | null;
  thumbnail_url?: string | null;
  product_file_url?: string | null;
};

export async function updateCourse(id: number, course: CourseUpdate, videos?: { id?: number, title: string, video_url: string, position: number }[]) {
  const conn = await getConnection();
  try {
    await conn.query(
      "UPDATE courses SET title = ?, description = ?, course_url = ?, thumbnail_url = ?, product_file_url = ? WHERE id = ?",
      [course.title, course.description, course.course_url || null, course.thumbnail_url || null, course.product_file_url || null, id]
    );

    if (videos) {
      // Get existing videos
      const [existing] = await conn.query<CourseVideo[]>("SELECT id FROM course_videos WHERE course_id = ?", [id]);
      const existingIds = existing.map(v => v.id);
      const incomingIds = videos.filter(v => v.id).map(v => v.id);
      const toDelete = existingIds.filter(eid => !incomingIds.includes(eid));

      if (toDelete.length > 0) {
        await conn.query("DELETE FROM course_videos WHERE id IN (?)", [toDelete]);
      }

      for (const v of videos) {
        if (v.id) {
          await conn.query(
            "UPDATE course_videos SET title = ?, video_url = ?, position = ? WHERE id = ?",
            [v.title, v.video_url, v.position, v.id]
          );
        } else {
          await conn.query(
            "INSERT INTO course_videos (course_id, title, video_url, position) VALUES (?, ?, ?, ?)",
            [id, v.title, v.video_url, v.position]
          );
        }
      }
    }
  } finally {
    await conn.end();
  }
}

export async function deleteCourse(id: number) {
  const conn = await getConnection();
  try {
    await conn.query("DELETE FROM courses WHERE id = ?", [id]);
  } finally {
    await conn.end();
  }
}

export async function getApplicationTheme() {
  try {
    await ensurePortalSchema();
    const conn = await getConnection();
    try {
      interface ThemeRow extends RowDataPacket {
        ["brand-50"]: string;
        ["brand-100"]: string;
        ["brand-200"]: string;
        ["brand-300"]: string;
        ["brand-400"]: string;
        ["brand-500"]: string;
        ["brand-600"]: string;
        ["brand-700"]: string;
        ["brand-800"]: string;
        ["brand-900"]: string;
        ["brand-950"]: string;
      }
      const [rows] = await conn.query<ThemeRow[]>("SELECT `brand-50`, `brand-100`, `brand-200`, `brand-300`, `brand-400`, `brand-500`, `brand-600`, `brand-700`, `brand-800`, `brand-900`, `brand-950` FROM application_them LIMIT 1");
      const r = rows[0] || null;
      if (!r) {
        return {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        };
      }
      return {
        50: String(r["brand-50"]),
        100: String(r["brand-100"]),
        200: String(r["brand-200"]),
        300: String(r["brand-300"]),
        400: String(r["brand-400"]),
        500: String(r["brand-500"]),
        600: String(r["brand-600"]),
        700: String(r["brand-700"]),
        800: String(r["brand-800"]),
        900: String(r["brand-900"]),
        950: String(r["brand-950"]),
      };
    } finally {
      await conn.end();
    }
  } catch {
    return {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a",
    };
  }
}

export async function updateApplicationTheme(colors: { [k: string]: string }) {
  await ensurePortalSchema();
  const conn = await getConnection();
  try {
    await conn.query(
      "UPDATE application_them SET `brand-50` = ?, `brand-100` = ?, `brand-200` = ?, `brand-300` = ?, `brand-400` = ?, `brand-500` = ?, `brand-600` = ?, `brand-700` = ?, `brand-800` = ?, `brand-900` = ?, `brand-950` = ?",
      [
        String(colors["50"] || ""),
        String(colors["100"] || ""),
        String(colors["200"] || ""),
        String(colors["300"] || ""),
        String(colors["400"] || ""),
        String(colors["500"] || ""),
        String(colors["600"] || ""),
        String(colors["700"] || ""),
        String(colors["800"] || ""),
        String(colors["900"] || ""),
        String(colors["950"] || ""),
      ]
    );
    return true;
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
        "UPDATE applications SET status = 'application' WHERE user_id = ? AND tag <> 'Disqualified' AND status IN ('video','prequal')",
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

export async function setApplicationApproval(applicationId: number, merchantId: string, trackingId: string, reviewerUserId: number) {
  const conn = await getConnection();
  try {
    await conn.query(
      "UPDATE applications SET merchant_id = ?, tracking_id = ?, status = 'approved' WHERE id = ?",
      [merchantId, trackingId, applicationId]
    );
    const [appRows] = await conn.query<RowDataPacket[]>("SELECT user_id FROM applications WHERE id = ?", [applicationId]);
    const userId = appRows[0]?.user_id as number | undefined;
    if (userId) {
      await conn.query(
        "INSERT INTO notifications (user_id, application_id, type, reason, scheduled_at) VALUES (?, ?, 'email', 'approved', NOW())",
        [userId, applicationId]
      );
    }
    await conn.query(
      "INSERT INTO document_audits (document_id, actor_user_id, action) VALUES (?, ?, 'approved')",
      [0, reviewerUserId]
    );
  } finally {
    await conn.end();
  }
}

export interface SupportNumber extends RowDataPacket {
  id: number;
  number: string;
  label?: string | null;
  active: number;
  created_at: string;
}

export async function listSupportNumbers(): Promise<SupportNumber[]> {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<SupportNumber[]>("SELECT id, number, label, active, created_at FROM support_numbers WHERE active = 1 ORDER BY created_at DESC");
    return rows;
  } finally {
    await conn.end();
  }
}

export async function createSupportNumber(number: string, label?: string) {
  const conn = await getConnection();
  try {
    await conn.query("INSERT INTO support_numbers (number, label) VALUES (?, ?)", [number, label || null]);
    return true;
  } finally {
    await conn.end();
  }
}

export async function deleteSupportNumber(id: number) {
  const conn = await getConnection();
  try {
    await conn.query("DELETE FROM support_numbers WHERE id = ?", [id]);
    return true;
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

export async function updateUserAffiliateStatus(userId: number, status: string | null) {
  const conn = await getConnection();
  try {
    await conn.query("UPDATE users SET affiliate_status = ? WHERE id = ?", [status, userId]);
  } finally {
    await conn.end();
  }
}

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

export async function listAffiliates() {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      `SELECT u.id, u.name, u.email, u.affiliate_status, u.created_at, u.phone,
       (SELECT COUNT(*) FROM users r WHERE r.referred_by = u.id) as referral_count 
       FROM users u 
       WHERE u.affiliate_status IS NOT NULL 
       ORDER BY u.created_at DESC`
    );
    return rows;
  } finally {
    await conn.end();
  }
}

export async function getReferrals(userId: number) {
  const conn = await getConnection();
  try {
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT id, name, email, status, created_at FROM users WHERE referred_by = ? ORDER BY created_at DESC",
      [userId]
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
