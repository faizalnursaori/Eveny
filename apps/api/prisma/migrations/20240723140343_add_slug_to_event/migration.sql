/*
  Warnings:

  - Added the required column `slug` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `slug` VARCHAR(191);

UPDATE `Event` SET `slug` = CONCAT('event-', LOWER(REPLACE(title, ' ', '-')), '-', id);

ALTER TABLE `Event` MODIFY COLUMN `slug` VARCHAR(191) NOT NULL;

CREATE UNIQUE INDEX `Event_slug_key` ON `Event`(`slug`);
