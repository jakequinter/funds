/*
  Warnings:

  - You are about to drop the column `primary_color` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `secondary_color` on the `categories` table. All the data in the column will be lost.
  - Added the required column `color` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` DROP COLUMN `primary_color`,
    DROP COLUMN `secondary_color`,
    ADD COLUMN `color` VARCHAR(191) NOT NULL;
