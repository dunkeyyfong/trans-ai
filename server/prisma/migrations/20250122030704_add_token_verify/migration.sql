/*
  Warnings:

  - You are about to drop the column `isActive` on the `History` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `History` DROP COLUMN `isActive`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `verifyToken` VARCHAR(191) NULL,
    MODIFY `isActive` BOOLEAN NOT NULL DEFAULT false;
