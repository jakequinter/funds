/*
  Warnings:

  - You are about to drop the column `seection_id` on the `expenses` table. All the data in the column will be lost.
  - You are about to drop the `sections` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[category_id]` on the table `expenses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `expenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `expenses_seection_id_key` ON `expenses`;

-- AlterTable
ALTER TABLE `expenses` DROP COLUMN `seection_id`,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `sections`;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `expenses_category_id_key` ON `expenses`(`category_id`);
