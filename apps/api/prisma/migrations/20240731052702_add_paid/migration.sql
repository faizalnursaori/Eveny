-- AlterTable
ALTER TABLE `transaction` MODIFY `status` ENUM('pending', 'paid', 'completed', 'failed') NOT NULL DEFAULT 'pending';
