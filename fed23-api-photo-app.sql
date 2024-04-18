-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 20, 2024 at 09:29 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fed23-api-photo-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `title`, `userId`) VALUES
(1, 'palle kulings album', 2),
(3, 'palle fulings album', 2),
(5, 'plingeling', 3);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `title`, `url`, `comment`, `userId`) VALUES
(1, 'kittycat', 'https://pixabay.com/photos/cat-kitten-pet-kitty-head-face-914110/', 'hejsanhoppsan', 2),
(2, 'emma2test', 'https://pixabay.com/photos/maltese-dog-puppy-small-dog-1123016/', 'here kittykitty', 2),
(4, 'doggydog', 'https://pixabay.com/photos/maltese-dog-puppy-small-dog-1123016/', 'here doggydogg', 3),
(5, 'doggydog', 'https://pixabay.com/photos/maltese-dog-puppy-small-dog-1123016/', 'here doggydogg', 3),
(7, 'test', 'https://pixabay.com/photos/cat-pet-animal-tabby-cat-300572/', 'söt hund voff', 1),
(8, 'häst', 'https://pixabay.com/photos/cat-pet-animal-tabby-cat-300572/', 'here kittykitty', 1),
(9, 'test', 'https://pixabay.com/photos/cat-pet-animal-tabby-cat-300572/', 'here kittykitty', 1),
(10, 'häst', 'https://pixabay.com/photos/cat-pet-animal-tabby-cat-300572/', 'here hästen', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `first_name`, `last_name`) VALUES
(1, 'loke@loke.com', '$2b$10$dWdCXMzzDAUy0RCFLqi.WObr.whqc2kz38tyDStUZ02oGta7QY06q', 'loke', 'loke'),
(2, 'emma@emma.com', '$2b$10$/N2H/7uJxUOPPASzNO0Y9elpvvRPcwzwlDFELW3DwRMArizOBUSzy', 'fillefjonk', 'emma'),
(3, 'tinge@ling.com', '$2b$10$MYm9sQguD0AA1dD.jbxh6.7xx18H.VNWS11wg1EslXxBIikNYhl7i', 'tingeling', 'tingeling');

-- --------------------------------------------------------

--
-- Table structure for table `_albumstophotos`
--

CREATE TABLE `_albumstophotos` (
  `A` int(10) UNSIGNED NOT NULL,
  `B` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_albumstophotos`
--

INSERT INTO `_albumstophotos` (`A`, `B`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0245cf4c-2257-49da-99fd-af801cd8d12c', '44593783e68b63c66b0f3c18dbde91d0f7687c7c3dad417d128c1757e58e79b9', '2024-02-20 15:21:55.937', '20240209230039_init', NULL, NULL, '2024-02-20 15:21:55.355', 1),
('4f5f552f-09c6-42ae-9b43-a0585ae545c3', '1e7adbe37ff448a2c9033a48e583a549b35151aadf82270a75ad561b61037c0a', '2024-02-20 15:21:55.979', '20240213204052_init', NULL, NULL, '2024-02-20 15:21:55.939', 1),
('dd203ee1-3e7b-4b66-a8a6-699329e057e7', '7fbeefa1ecb6b6bd9d574c1d2b2ef3aeba4d11f2e6871e97ce84f25935fcb77d', '2024-02-20 15:22:08.418', '20240220152208_no_comment_in_albums', NULL, NULL, '2024-02-20 15:22:08.337', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Albums_title_key` (`title`),
  ADD KEY `Albums_userId_fkey` (`userId`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Photos_userId_fkey` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_albumstophotos`
--
ALTER TABLE `_albumstophotos`
  ADD UNIQUE KEY `_AlbumsToPhotos_AB_unique` (`A`,`B`),
  ADD KEY `_AlbumsToPhotos_B_index` (`B`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `Albums_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `Photos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `_albumstophotos`
--
ALTER TABLE `_albumstophotos`
  ADD CONSTRAINT `_AlbumsToPhotos_A_fkey` FOREIGN KEY (`A`) REFERENCES `albums` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_AlbumsToPhotos_B_fkey` FOREIGN KEY (`B`) REFERENCES `photos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
