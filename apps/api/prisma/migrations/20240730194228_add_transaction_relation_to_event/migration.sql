-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
