import dotenv from 'dotenv'
import path from "path";
import fs from "fs";
dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL || "");

export const DB_USER = dbUrl.username;
export const DB_PASSWORD = dbUrl.password;
export const DB_HOST = dbUrl.hostname;
export const DB_PORT = dbUrl.port;
export const DB_NAME = dbUrl.pathname.replace("/", "");

export const BACKUP_DIR = path.join(__dirname, "../backups");

// Đảm bảo thư mục backup tồn tại
export function ensureBackupDirExists() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
  }
}