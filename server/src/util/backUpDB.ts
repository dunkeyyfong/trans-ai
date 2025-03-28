import { exec } from "child_process";
import path from "path";
import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  BACKUP_DIR,
  ensureBackupDirExists
} from "./dbConfig";

ensureBackupDirExists();

export const backUpDB = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(BACKUP_DIR, `${DB_NAME}-${timestamp}.sql`);
  const dumpCommand = `mysqldump -u${DB_USER} -p${DB_PASSWORD} -h${DB_HOST} -P${DB_PORT} ${DB_NAME} > "${backupFile}"`;

  exec(dumpCommand, (error) => {
    if (error) {
      console.error(`❌ Backup thất bại: ${error.message}`);
    } else {
      console.log(`✅ Backup thành công: ${backupFile}`);
    }
  });
}