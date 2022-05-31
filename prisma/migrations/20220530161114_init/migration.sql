/*
  Warnings:

  - You are about to drop the column `resetStatus_pass` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `usd` on the `wallet` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `Decimal(12,5)`.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `resetStatus_pass`,
    ADD COLUMN `reset_status_pass` BOOLEAN NULL DEFAULT false,
    MODIFY `confirm_email` BOOLEAN NULL DEFAULT false,
    MODIFY `verific_code` VARCHAR(45) NULL;

-- AlterTable
ALTER TABLE `wallet` MODIFY `address_btc` VARCHAR(99) NULL,
    MODIFY `sats` INTEGER NULL,
    MODIFY `usd` DECIMAL(12, 5) NULL;
