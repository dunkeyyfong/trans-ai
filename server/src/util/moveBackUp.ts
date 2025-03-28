import fs from "fs";
import path from "path";
import cron from "node-cron";
import { BACKUP_DIR, ensureBackupDirExists } from "./dbConfig";

ensureBackupDirExists();

export const moveBackUp = () =>{
  const MAX_DAYS = 30;
  const now = Date.now();

  fs.readdir(BACKUP_DIR, (err, files) => {
    if (err) {
      console.error("❌ Không đọc được thư mục backups:", err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(BACKUP_DIR, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;

        const ageInDays = (now - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);
        if (ageInDays > MAX_DAYS) {
          fs.unlink(filePath, err => {
            if (!err) {
              console.log(`🗑️ Đã xoá file cũ: ${file}`);
            }
          });
        }
      });
    });
  });
}