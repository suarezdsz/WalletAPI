/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exchangerate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_category_id_fkey`;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `exchangerate`;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `wallet`;

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
    `name` VARCHAR(45) NOT NULL,
    `currency` VARCHAR(10) NOT NULL,
    `price` DECIMAL(12, 5) NULL,
    `img` VARCHAR(45) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Categories` ADD CONSTRAINT `Categories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
