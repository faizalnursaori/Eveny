/*
  Warnings:

  - You are about to drop the `prize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userprize` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userprize` DROP FOREIGN KEY `UserPrize_prizeId_fkey`;

-- DropForeignKey
ALTER TABLE `userprize` DROP FOREIGN KEY `UserPrize_userId_fkey`;

-- AlterTable
ALTER TABLE `point` MODIFY `receiveDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `voucherId` INTEGER NULL;

-- DropTable
DROP TABLE `prize`;

-- DropTable
DROP TABLE `userprize`;

-- CreateTable
CREATE TABLE `vouchers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `discount` INTEGER NOT NULL,
    `expiryDate` DATETIME(3) NULL,
    `maxUsage` INTEGER NOT NULL,
    `usage` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `eventId` INTEGER NULL,
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `vouchers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
