-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `transactionId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Point_expiryDate_idx` ON `Point`(`expiryDate`);

-- CreateIndex
CREATE INDEX `PointTransaction_createdAt_idx` ON `PointTransaction`(`createdAt`);

-- CreateIndex
CREATE INDEX `Promotion_discountCode_idx` ON `Promotion`(`discountCode`);

-- CreateIndex
CREATE INDEX `Ticket_transactionId_idx` ON `Ticket`(`transactionId`);

-- CreateIndex
CREATE INDEX `User_email_idx` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `point` RENAME INDEX `Point_userId_fkey` TO `Point_userId_idx`;

-- RenameIndex
ALTER TABLE `pointtransaction` RENAME INDEX `PointTransaction_userId_fkey` TO `PointTransaction_userId_idx`;

-- RenameIndex
ALTER TABLE `promotion` RENAME INDEX `Promotion_eventId_fkey` TO `Promotion_eventId_idx`;

-- RenameIndex
ALTER TABLE `review` RENAME INDEX `Review_eventId_fkey` TO `Review_eventId_idx`;

-- RenameIndex
ALTER TABLE `review` RENAME INDEX `Review_userId_fkey` TO `Review_userId_idx`;

-- RenameIndex
ALTER TABLE `ticket` RENAME INDEX `Ticket_eventId_fkey` TO `Ticket_eventId_idx`;

-- RenameIndex
ALTER TABLE `transaction` RENAME INDEX `Transaction_userId_fkey` TO `Transaction_userId_idx`;

-- RenameIndex
ALTER TABLE `userprize` RENAME INDEX `UserPrize_prizeId_fkey` TO `UserPrize_prizeId_idx`;

-- RenameIndex
ALTER TABLE `userprize` RENAME INDEX `UserPrize_userId_fkey` TO `UserPrize_userId_idx`;
