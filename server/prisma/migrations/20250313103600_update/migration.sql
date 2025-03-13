/*
  Warnings:

  - You are about to drop the `Count` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Count`;

-- CreateTable
CREATE TABLE `CountVistor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
