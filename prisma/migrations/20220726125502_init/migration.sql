/*
  Warnings:

  - Made the column `price` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Categories_user_id_fkey` ON `categories`;

-- AlterTable
ALTER TABLE `products` MODIFY `price` DECIMAL(12, 5) NOT NULL,
    MODIFY `img` VARCHAR(45) NULL;
