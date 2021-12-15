/*
  Warnings:

  - Added the required column `type` to the `Assessment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Assessment` ADD COLUMN `type` ENUM('DAILY', 'WEEKLY', 'MONTHLY') NOT NULL;
