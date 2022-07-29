-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(99) NOT NULL,
    `biometric` VARCHAR(99) NULL,
    `phone` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `confirm_email` BOOLEAN NULL DEFAULT false,
    `reset_status_pass` BOOLEAN NULL DEFAULT false,
    `verific_code` VARCHAR(45) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `code_reference` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallets` (
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
CREATE TABLE `Fiat` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `currency` VARCHAR(99) NOT NULL,
    `status` BOOLEAN NULL DEFAULT false,
    `value_rate` DECIMAL(12, 5) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Fiat_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `currency` VARCHAR(10) NOT NULL,
    `price` DECIMAL(12, 5) NOT NULL,
    `img` VARCHAR(45) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `References` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `code_reference` VARCHAR(45) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `References_code_reference_key`(`code_reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group_Reference` (
    `id` VARCHAR(191) NOT NULL,
    `reference_id` VARCHAR(191) NOT NULL,
    `user_refered` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `References` ADD CONSTRAINT `References_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Group_Reference` ADD CONSTRAINT `Group_Reference_user_refered_fkey` FOREIGN KEY (`user_refered`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Group_Reference` ADD CONSTRAINT `Group_Reference_reference_id_fkey` FOREIGN KEY (`reference_id`) REFERENCES `References`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
