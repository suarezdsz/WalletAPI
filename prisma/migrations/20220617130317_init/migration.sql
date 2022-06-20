-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(99) NOT NULL,
    `phone` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `confirm_email` BOOLEAN NULL DEFAULT false,
    `reset_status_pass` BOOLEAN NULL DEFAULT false,
    `verific_code` VARCHAR(45) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(99) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `login` VARCHAR(99) NOT NULL,
    `password` VARCHAR(99) NOT NULL,
    `address_btc` VARCHAR(99) NULL,
    `type` VARCHAR(45) NOT NULL,
    `refresh_token` VARCHAR(99) NOT NULL,
    `access_token` VARCHAR(99) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `sats` INTEGER NULL,
    `usd` DECIMAL(12, 5) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExchangeRate` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `currency` VARCHAR(99) NOT NULL,
    `status` BOOLEAN NULL DEFAULT false,
    `value_rate` DECIMAL(12, 5) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ExchangeRate_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
