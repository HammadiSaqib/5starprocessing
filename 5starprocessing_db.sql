-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 24, 2026 at 03:47 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `5starprocessing_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'prequal',
  `tag` varchar(32) DEFAULT NULL,
  `industry` varchar(100) DEFAULT NULL,
  `processing_current` tinyint(1) DEFAULT NULL,
  `monthly_volume` decimal(12,2) DEFAULT NULL,
  `us_citizen` tinyint(1) DEFAULT NULL,
  `active_us_bank` tinyint(1) DEFAULT NULL,
  `fees_payer` varchar(32) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `user_id`, `status`, `tag`, `industry`, `processing_current`, `monthly_volume`, `us_citizen`, `active_us_bank`, `fees_payer`, `created_at`, `updated_at`) VALUES
(1, 6, 'under_review', 'Qualified', 'trackdiv', 1, 5000.00, 1, 1, 'merchant', '2026-01-15 07:56:27', '2026-01-15 07:58:18'),
(2, 7, 'under_review', 'Qualified', 'CarftDiv', 1, 500.00, 1, 1, 'merchant', '2026-01-15 08:12:18', '2026-01-15 08:15:43'),
(3, 10, 'under_review', 'Qualified', 'Test', 1, 10.00, 1, 1, 'merchant', '2026-01-15 11:45:04', '2026-01-15 11:45:55'),
(4, 12, 'under_review', 'Qualified', 'Test3', 1, 10.00, 1, 1, 'merchant', '2026-01-15 11:52:09', '2026-01-15 11:53:23'),
(5, 13, 'under_review', 'Qualified', 'Test4', 1, 10.00, 1, 1, 'merchant', '2026-01-16 06:50:54', '2026-01-16 06:56:54'),
(6, 14, 'under_review', 'Qualified', 'test5', 1, 10.00, 1, 1, 'merchant', '2026-01-16 07:31:43', '2026-01-16 07:32:30'),
(7, 15, 'under_review', 'Qualified', 'Shop', 1, 3000.00, 1, 1, 'merchant', '2026-01-19 21:51:10', '2026-01-19 21:54:48'),
(8, 16, 'disqualified', 'Disqualified', 'Test', 1, 1000.00, 0, 1, 'merchant', '2026-01-23 09:09:15', '2026-01-23 09:16:06'),
(9, 17, 'disqualified', 'Disqualified', 'Not Eligible', 1, 10.00, 0, 1, 'customer', '2026-01-23 09:25:00', '2026-01-23 09:27:51'),
(10, 18, 'application', 'Qualified', 'Industry', 1, 10.00, 1, 1, 'merchant', '2026-01-23 09:31:14', '2026-01-24 03:41:22');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` int NOT NULL,
  `application_id` int NOT NULL,
  `doc_type` varchar(64) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'uploaded',
  `reviewer_user_id` int DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `application_id`, `doc_type`, `file_path`, `status`, `reviewer_user_id`, `reviewed_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'bank_statement', '/uploads/1/bank_statement-1768463889021.pdf', 'uploaded', NULL, NULL, '2026-01-15 07:58:09', '2026-01-15 07:58:09'),
(2, 1, 'driver_license', '/uploads/1/driver_license-1768463893272.pdf', 'uploaded', NULL, NULL, '2026-01-15 07:58:13', '2026-01-15 07:58:13'),
(3, 1, 'voided_check', '/uploads/1/voided_check-1768463896762.pdf', 'uploaded', NULL, NULL, '2026-01-15 07:58:16', '2026-01-15 07:58:16'),
(4, 2, 'bank_statement', '/uploads/2/bank_statement-1768464933864.pdf', 'uploaded', NULL, NULL, '2026-01-15 08:15:33', '2026-01-15 08:15:33'),
(5, 2, 'driver_license', '/uploads/2/driver_license-1768464937340.pdf', 'uploaded', NULL, NULL, '2026-01-15 08:15:37', '2026-01-15 08:15:37'),
(6, 2, 'voided_check', '/uploads/2/voided_check-1768464940138.pdf', 'uploaded', NULL, NULL, '2026-01-15 08:15:40', '2026-01-15 08:15:40'),
(7, 4, 'bank_statement', '/uploads/4/bank_statement-1768477988642.pdf', 'uploaded', NULL, NULL, '2026-01-15 11:53:08', '2026-01-15 11:53:08'),
(8, 4, 'driver_license', '/uploads/4/driver_license-1768477996821.pdf', 'uploaded', NULL, NULL, '2026-01-15 11:53:16', '2026-01-15 11:53:16'),
(9, 4, 'voided_check', '/uploads/4/voided_check-1768478000518.pdf', 'uploaded', NULL, NULL, '2026-01-15 11:53:20', '2026-01-15 11:53:20'),
(10, 6, 'bank_statement', '/uploads/6/bank_statement-1768548738873.pdf', 'uploaded', NULL, NULL, '2026-01-16 07:32:18', '2026-01-16 07:32:18'),
(11, 6, 'driver_license', '/uploads/6/driver_license-1768548741464.pdf', 'uploaded', NULL, NULL, '2026-01-16 07:32:21', '2026-01-16 07:32:21'),
(12, 6, 'voided_check', '/uploads/6/voided_check-1768548744070.pdf', 'uploaded', NULL, NULL, '2026-01-16 07:32:24', '2026-01-16 07:32:24'),
(13, 7, 'bank_statement', '/uploads/7/bank_statement-1768859681029.jpg', 'uploaded', NULL, NULL, '2026-01-19 21:54:41', '2026-01-19 21:54:41'),
(14, 7, 'driver_license', '/uploads/7/driver_license-1768859683565.png', 'uploaded', NULL, NULL, '2026-01-19 21:54:43', '2026-01-19 21:54:43'),
(15, 7, 'voided_check', '/uploads/7/voided_check-1768859686273.png', 'uploaded', NULL, NULL, '2026-01-19 21:54:46', '2026-01-19 21:54:46');

-- --------------------------------------------------------

--
-- Table structure for table `document_audits`
--

CREATE TABLE `document_audits` (
  `id` int NOT NULL,
  `document_id` int NOT NULL,
  `actor_user_id` int NOT NULL,
  `action` varchar(32) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `document_audits`
--

INSERT INTO `document_audits` (`id`, `document_id`, `actor_user_id`, `action`, `created_at`) VALUES
(1, 1, 0, 'uploaded', '2026-01-15 07:58:09'),
(2, 2, 0, 'uploaded', '2026-01-15 07:58:13'),
(3, 3, 0, 'uploaded', '2026-01-15 07:58:16'),
(4, 4, 0, 'uploaded', '2026-01-15 08:15:33'),
(5, 5, 0, 'uploaded', '2026-01-15 08:15:37'),
(6, 6, 0, 'uploaded', '2026-01-15 08:15:40'),
(7, 7, 0, 'uploaded', '2026-01-15 11:53:08'),
(8, 8, 0, 'uploaded', '2026-01-15 11:53:16'),
(9, 9, 0, 'uploaded', '2026-01-15 11:53:20'),
(10, 10, 0, 'uploaded', '2026-01-16 07:32:18'),
(11, 11, 0, 'uploaded', '2026-01-16 07:32:21'),
(12, 12, 0, 'uploaded', '2026-01-16 07:32:24'),
(13, 13, 0, 'uploaded', '2026-01-19 21:54:41'),
(14, 14, 0, 'uploaded', '2026-01-19 21:54:43'),
(15, 15, 0, 'uploaded', '2026-01-19 21:54:46');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `affiliate` varchar(100) DEFAULT NULL,
  `source_page` varchar(255) DEFAULT NULL,
  `campaign` varchar(255) DEFAULT NULL,
  `industry` varchar(100) DEFAULT NULL,
  `currently_processing` tinyint(1) NOT NULL DEFAULT '0',
  `monthly_volume` int DEFAULT NULL,
  `us_citizen` tinyint(1) NOT NULL DEFAULT '0',
  `active_us_bank` tinyint(1) NOT NULL DEFAULT '0',
  `pays_fees` enum('merchant','customer') DEFAULT NULL,
  `qualification` enum('qualified','conditional','disqualified') DEFAULT NULL,
  `risk_level` enum('low','medium','high') DEFAULT NULL,
  `processing_tier` varchar(50) DEFAULT NULL,
  `webinar_watched` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `email`, `affiliate`, `source_page`, `campaign`, `industry`, `currently_processing`, `monthly_volume`, `us_citizen`, `active_us_bank`, `pays_fees`, `qualification`, `risk_level`, `processing_tier`, `webinar_watched`, `created_at`, `updated_at`) VALUES
(1, 'lead1@example.com', NULL, NULL, NULL, 'E-Commerce', 1, 12000, 1, 1, 'merchant', 'qualified', 'medium', 'tier-2', 0, '2026-01-11 13:22:01', '2026-01-11 13:22:01');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `application_id` int DEFAULT NULL,
  `type` varchar(16) NOT NULL,
  `reason` varchar(32) NOT NULL,
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `status` varchar(16) NOT NULL DEFAULT 'pending',
  `attempts` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `submit`
--

CREATE TABLE `submit` (
  `id` int NOT NULL,
  `application_id` int NOT NULL,
  `data` json DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `submit`
--

INSERT INTO `submit` (`id`, `application_id`, `data`, `updated_at`) VALUES
(1, 1, '{\"banking\": {\"account\": \"920452367856345\", \"routing\": \"UBL\", \"bankName\": \"Meezan\"}, \"company\": {\"dba\": \"DHA\", \"address\": \"Karachi\", \"legalName\": \"Hammad Saqib\"}, \"ownership\": {\"percent\": 10, \"ownerName\": \"Hammad Saqib\"}}', '2026-01-16 02:07:03'),
(2, 2, '{\"banking\": {\"account\": \"Current\", \"routing\": \"IDK\", \"bankName\": \"Meezan Bank\"}, \"company\": {\"dba\": \"Manages\", \"address\": \"Karachi, Pakistan\", \"legalName\": \"Software\"}, \"ownership\": {\"percent\": 500, \"ownerName\": \"Munib Ahmed\"}}', '2026-01-16 02:07:03'),
(3, 3, '{\"banking\": {\"account\": \"test\", \"routing\": \"test\", \"bankName\": \"test\"}, \"company\": {\"dba\": \"test\", \"address\": \"test\", \"legalName\": \"test\"}, \"ownership\": {\"percent\": 10, \"ownerName\": \"test\"}}', '2026-01-16 02:07:03'),
(4, 4, '{\"banking\": {\"account\": \"Test3\", \"routing\": \"Test3\", \"bankName\": \"Test3\"}, \"company\": {\"dba\": \"Test3\", \"address\": \"Test3\", \"legalName\": \"Test3\"}, \"ownership\": {\"percent\": 10, \"ownerName\": \"Test3\"}}', '2026-01-16 02:07:03'),
(5, 5, '{\"banking\": {\"account\": \"Test4\", \"routing\": \"Test4\", \"bankName\": \"Test4\"}, \"company\": {\"dba\": \"Test4\", \"address\": \"Test4\", \"legalName\": \"Test4\"}, \"ownership\": {\"percent\": 10, \"ownerName\": \"Test4\"}}', '2026-01-16 06:56:52'),
(27, 6, '{\"banking\": {\"account\": \"test5\", \"routing\": \"test5\", \"bankName\": \"test5\"}, \"company\": {\"dba\": \"test5\", \"address\": \"test5\", \"legalName\": \"test5\"}, \"ownership\": {\"percent\": 10, \"ownerName\": \"test5\"}}', '2026-01-16 07:32:09'),
(41, 7, '{\"banking\": {\"account\": \"6435403761\", \"routing\": \"123456789\", \"bankName\": \"Chase\"}, \"company\": {\"dba\": \"test\", \"address\": \"sdfs fdsf dsf dsf\", \"legalName\": \"Test\"}, \"ownership\": {\"percent\": 50, \"ownerName\": \"test\"}}', '2026-01-19 21:54:34'),
(130, 10, '{\"banking\": {\"account\": \"\", \"routing\": \"\", \"bankName\": \"\"}, \"company\": {\"dba\": \"\", \"address\": \"\", \"legalName\": \"\"}, \"ownership\": {\"percent\": 0, \"ownerName\": \"\"}}', '2026-01-24 03:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` varchar(20) DEFAULT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'applicant',
  `status` varchar(20) NOT NULL DEFAULT 'Pending',
  `status_reason` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `created_at`, `updated_at`, `phone`, `role`, `status`, `status_reason`) VALUES
(7, 'Munib', 'munibahmeed@gmail.com', '$2b$10$TozLhFdTx8cJOX.dW/eX1u4GvGrR6kMqZHkZZTSyZfvGAVVCjjdBu', '2026-01-15 08:11:10', '2026-01-23 08:35:40', NULL, 'applicant', 'Declined', NULL),
(8, 'Rick Admin', 'adim@5starprocessing.com', '$2b$10$2JTg0jh9vhAmor6DAfp3Ae0xv5fTEmLoLSKXzAnvcl26IMp8dOrMq', '2026-01-15 08:29:50', '2026-01-15 08:30:03', NULL, 'admin', 'Pending', NULL),
(9, 'Team Staff', 'team@5starprocessing.com', '$2b$10$A8EWwiLBVxLEkW.iyyeks.3QXVqipQP3Epf9ApONu1LMKHPEy.dlK', '2026-01-15 09:37:27', '2026-01-15 09:38:21', NULL, 'team', 'Pending', NULL),
(10, 'test', 'test@gmail.com', '$2b$10$6rmwujUJpohImnuGj8DhjuYaEtSQAFA.J3X7fdtxUR.xyKhFaw2Y.', '2026-01-15 11:40:42', '2026-01-15 11:40:42', NULL, 'applicant', 'Pending', NULL),
(11, 'Test2', 'test2@gmail.com', '$2b$10$JBUHZyPJdgAKp2iZQxQHsO.pnmq9VeR7gHpmfSehBCUK8pvHuvMUW', '2026-01-15 11:50:22', '2026-01-15 11:50:22', NULL, 'applicant', 'Pending', NULL),
(12, 'Test 3', 'test3@gmail.com', '$2b$10$6F.Qr/MBcZi9QGTJxBSgeOHdOXGQChGOpVEqVaTjbD/rr/wrjp9WK', '2026-01-15 11:51:50', '2026-01-15 11:51:50', NULL, 'applicant', 'Pending', NULL),
(13, 'Test Four', 'test4@5starprocessing.com', '$2b$10$X5Bwr7ONbGRcL73lgOOVAeCwSA5bk/6cRwDOCUmBZZAByLVJGTcnq', '2026-01-16 06:48:23', '2026-01-16 06:48:23', NULL, 'applicant', 'Pending', NULL),
(14, 'Test5', 'test5@5starprocessing.com', '$2b$10$pHTPG.AUSFT0xLW0.JklI.N1PWKoY5vJ9chheXZZP7Ig1HK7GG5GK', '2026-01-16 07:31:19', '2026-01-23 08:35:31', NULL, 'applicant', 'Possed', 'Docs Are Too Blury'),
(15, 'Hammad Saqib', 'hammad@example.com', '$2b$10$fqPB1SLKS/y5AX9MU4T0peXTpq3lgbr16xyggtEiH/T4jyysjkibC', '2026-01-19 21:50:08', '2026-01-23 08:35:18', NULL, 'applicant', 'Approved', 'Perfact'),
(16, 'Test6', 'test6@5starprocessing.com', '$2b$10$Hw8./zIa.ZKii.3ab.0jC.j14ZoXtZGmOANYgNVKh3xpDUm6w7cRW', '2026-01-23 08:50:56', '2026-01-23 08:50:56', NULL, 'applicant', 'Pending', NULL),
(17, 'Test7', 'test7@5starprocessing.com', '$2b$10$wEn/uOutpFnPHZ6ogmEN2OWEKd9RPv0QH.wIhfh3PGMbeGzRuhEcq', '2026-01-23 09:24:49', '2026-01-23 09:24:49', NULL, 'applicant', 'Pending', NULL),
(18, 'Test8', 'test8@5starprocessing.com', '$2b$10$Pvg/dY7w/vkesg8isr0IuuftjMt.WTuQheQbhxhZT9UcSuFKrKTGG', '2026-01-23 09:31:01', '2026-01-24 03:09:12', NULL, 'applicant', 'Approved', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `video_progress`
--

CREATE TABLE `video_progress` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `video_id` varchar(64) NOT NULL,
  `progress_percent` int NOT NULL DEFAULT '0',
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `video_progress`
--

INSERT INTO `video_progress` (`id`, `user_id`, `video_id`, `progress_percent`, `completed`, `updated_at`) VALUES
(1, 6, 'industry', 100, 1, '2026-01-15 07:56:49'),
(56, 7, 'industry', 91, 1, '2026-01-15 08:12:31'),
(93, 10, 'industry', 0, 0, '2026-01-15 11:46:39'),
(147, 12, 'industry', 0, 0, '2026-01-15 11:58:10'),
(232, 13, 'industry', 0, 0, '2026-01-16 07:06:05'),
(272, 14, 'industry', 100, 1, '2026-01-16 07:31:57'),
(312, 15, 'industry', 100, 1, '2026-01-19 21:51:28'),
(353, 18, 'industry', 39, 0, '2026-01-24 03:41:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user_id` (`user_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document_audits`
--
ALTER TABLE `document_audits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submit`
--
ALTER TABLE `submit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_app` (`application_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `video_progress`
--
ALTER TABLE `video_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_user_video` (`user_id`,`video_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `document_audits`
--
ALTER TABLE `document_audits`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `submit`
--
ALTER TABLE `submit`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `video_progress`
--
ALTER TABLE `video_progress`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=530;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
