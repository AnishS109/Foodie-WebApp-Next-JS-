/*
  Warnings:

  - You are about to drop the column `passwrod` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `passwrod`,
    ADD COLUMN `password` VARCHAR(191) NULL;
