-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `phone` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `confirm_email` BOOLEAN NOT NULL DEFAULT false,
    `resetStatus_pass` BOOLEAN NOT NULL DEFAULT false,
    `verific_code` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `login` VARCHAR(99) NOT NULL,
    `password` VARCHAR(99) NOT NULL,
    `address_btc` VARCHAR(99) NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `refresh_token` VARCHAR(99) NOT NULL,
    `access_token` VARCHAR(99) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `sats` INTEGER NOT NULL,
    `usd` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Wallet_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
