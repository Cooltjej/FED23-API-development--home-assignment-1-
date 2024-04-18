/*
  Warnings:

  - You are about to drop the `albumsandphotos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `albumsandphotos` DROP FOREIGN KEY `AlbumsAndPhotos_albumId_fkey`;

-- DropForeignKey
ALTER TABLE `albumsandphotos` DROP FOREIGN KEY `AlbumsAndPhotos_photoId_fkey`;

-- DropTable
DROP TABLE `albumsandphotos`;
