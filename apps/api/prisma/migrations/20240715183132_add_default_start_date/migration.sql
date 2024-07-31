/*
  Warnings:

  - Made the column `transactionId` on table `ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_transactionId_fkey`;

-- AlterTable
ALTER TABLE `ticket` MODIFY `transactionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
