/*
  Warnings:

  - You are about to drop the column `answer` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Assessment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Assessment` DROP COLUMN `answer`,
    DROP COLUMN `question`;

-- CreateTable
CREATE TABLE `QuestionAnswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `assessmentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
