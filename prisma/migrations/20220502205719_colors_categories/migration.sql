/*
  Warnings:

  - You are about to drop the column `color` on the `categories` table. All the data in the column will be lost.
  - Added the required column `primary_color` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondary_color` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` DROP COLUMN `color`,
    ADD COLUMN `primary_color` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondary_color` VARCHAR(191) NOT NULL;
