/*
  Warnings:

  - You are about to drop the column `transactionId` on the `ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_transactionId_fkey`;

-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `transactionId`;
