-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Photos` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NULL,
    `userId` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Albums` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NULL,
    `userId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `Albums_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlbumsAndPhotos` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `photoId` INTEGER UNSIGNED NOT NULL,
    `albumId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `AlbumsAndPhotos_photoId_albumId_key`(`photoId`, `albumId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AlbumsToPhotos` (
    `A` INTEGER UNSIGNED NOT NULL,
    `B` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `_AlbumsToPhotos_AB_unique`(`A`, `B`),
    INDEX `_AlbumsToPhotos_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Photos` ADD CONSTRAINT `Photos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Albums` ADD CONSTRAINT `Albums_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumsAndPhotos` ADD CONSTRAINT `AlbumsAndPhotos_photoId_fkey` FOREIGN KEY (`photoId`) REFERENCES `Photos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlbumsAndPhotos` ADD CONSTRAINT `AlbumsAndPhotos_albumId_fkey` FOREIGN KEY (`albumId`) REFERENCES `Albums`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlbumsToPhotos` ADD CONSTRAINT `_AlbumsToPhotos_A_fkey` FOREIGN KEY (`A`) REFERENCES `Albums`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlbumsToPhotos` ADD CONSTRAINT `_AlbumsToPhotos_B_fkey` FOREIGN KEY (`B`) REFERENCES `Photos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
