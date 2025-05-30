/*
  Warnings:

  - You are about to drop the column `name` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `fooditem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Itemname` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `name`,
    DROP COLUMN `price`,
    ADD COLUMN `Itemname` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `fooditem_name_key` ON `fooditem`(`name`);

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_Itemname_fkey` FOREIGN KEY (`Itemname`) REFERENCES `fooditem`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
