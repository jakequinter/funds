/*
  Warnings:

  - You are about to alter the column `month` on the `instances` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `year` on the `instances` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `instances` MODIFY `month` INTEGER NOT NULL,
    MODIFY `year` INTEGER NOT NULL;
