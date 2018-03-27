-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2018 at 02:28 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realtime_location_tracking`
--

-- --------------------------------------------------------

--
-- Table structure for table `modes_tracking`
--

CREATE TABLE `modes_tracking` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `object_tracking` varchar(255) NOT NULL,
  `display_property` varchar(255) NOT NULL,
  `object_owner` varchar(255) DEFAULT NULL,
  `is_required_identification` tinyint(4) NOT NULL DEFAULT '0',
  `is_required_phone_number` tinyint(4) NOT NULL DEFAULT '0',
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `table_reference` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Chế độ theo dõi';

--
-- Dumping data for table `modes_tracking`
--

INSERT INTO `modes_tracking` (`id`, `name`, `object_tracking`, `display_property`, `object_owner`, `is_required_identification`, `is_required_phone_number`, `state`, `created_at`, `updated_at`, `table_reference`) VALUES
(20, 'Giám sát bảo vệ', 'Bảo vệ', 'Họ và tên', NULL, 1, 1, 1, '2018-03-26 12:47:23.000000', '2018-03-26 12:47:53.000000', 'giam_sat_bao_ve1522068443'),
(21, 'Giám sát xe phế', 'Xe phế', 'Biển số xe', 'Lái xe', 1, 1, 1, '2018-03-26 12:47:43.000000', '2018-03-26 12:47:53.000000', 'giam_sat_xe_phe1522068463');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `modes_tracking`
--
ALTER TABLE `modes_tracking`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `table_reference_UNIQUE` (`table_reference`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `modes_tracking`
--
ALTER TABLE `modes_tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
