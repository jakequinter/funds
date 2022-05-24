/*
  Warnings:

  - You are about to drop the column `user_id` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `expenses` table. All the data in the column will be lost.
  - Added the required column `instance_id` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `categories_user_id_name_key` ON `categories`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `user_id`,
    ADD COLUMN `instance_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `expenses` DROP COLUMN `user_id`;

-- CreateTable
CREATE TABLE `instances` (
    `id` VARCHAR(191) NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `instances_month_year_key`(`month`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
