/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `finalPrice` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `discount` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - Added the required column `eventId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `eventId` INTEGER NOT NULL,
    MODIFY `totalPrice` INTEGER NOT NULL,
    MODIFY `finalPrice` INTEGER NOT NULL,
    MODIFY `discount` INTEGER NOT NULL;
