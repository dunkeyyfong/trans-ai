/*
  Warnings:

  - You are about to drop the column `link` on the `History` table. All the data in the column will be lost.
  - Added the required column `content` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `History` DROP COLUMN `link`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL;
