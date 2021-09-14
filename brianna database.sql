-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 14, 2021 at 10:18 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `brianna`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `street_name` varchar(25) NOT NULL,
  `number` varchar(5) NOT NULL,
  `city` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `street_name`, `number`, `city`) VALUES
(10, 'Nachal Shimshon ', '9', 'Bet Shemesh'),
(11, 'Beit Israel', '42', 'Emanuel'),
(12, ' 5th Avenue', '521', 'new york'),
(13, 'cave', '1', 'rock'),
(14, 'it', '9', 'doesnt'),
(15, 'neither', '987', 'does');

-- --------------------------------------------------------

--
-- Table structure for table `logistics_report`
--

CREATE TABLE `logistics_report` (
  `id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  `working_guns` int(11) NOT NULL,
  `trijicon_sights` int(11) NOT NULL,
  `meprolight_sights` int(11) NOT NULL,
  `full_magazines` int(11) NOT NULL,
  `magazine_holsters` int(11) NOT NULL,
  `working_helmets` int(11) NOT NULL,
  `working_radios` int(11) NOT NULL,
  `mouthpieces` int(11) NOT NULL,
  `radiators` int(11) NOT NULL,
  `leather_holster` int(11) NOT NULL,
  `storm_jackets` int(11) NOT NULL,
  `winter_suits` int(11) NOT NULL,
  `kettle` varchar(11) NOT NULL,
  `provisions` varchar(11) NOT NULL,
  `safe_key` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `post_shifts`
--

CREATE TABLE `post_shifts` (
  `id` int(11) NOT NULL,
  `shift_type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `post_shifts`
--

INSERT INTO `post_shifts` (`id`, `shift_type`) VALUES
(1, 'בוקר_8'),
(2, 'צהרים_8'),
(3, 'ערב_8'),
(4, 'יום_12'),
(5, 'לילה_12');

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `region` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `regions`
--

INSERT INTO `regions` (`id`, `region`) VALUES
(0, 'south'),
(1, 'east'),
(9, 'north'),
(10, 'west');

-- --------------------------------------------------------

--
-- Table structure for table `user_auth`
--

CREATE TABLE `user_auth` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_auth`
--

INSERT INTO `user_auth` (`id`, `username`, `password`) VALUES
(10, '318468782', '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8'),
(11, '318442266', 'd2acf78268fef0d187567894faadfc4ed4fdc517'),
(12, '123456789', 'f7c3bc1d808e04732adf679965ccc34ca7ae3441'),
(13, '001001001', '99c0a7d4cb0d90ed00e502ba5180783d64de106b'),
(14, '147258369', '345120426285ff8b1d43653a4d078170b4761f75'),
(15, '963852741', '5ac1733a124130c7426bab67f540a8e7f9bf3fd9');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `national_id` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `first_name`, `last_name`, `national_id`) VALUES
(10, 'David', 'Wellins', 318468782),
(11, 'Shneor', 'Aharoni', 318442266),
(12, 'Boss', 'Man', 123456789),
(13, 'fred', 'flintstone', 1001001),
(14, 'Shlomi', 'Hai', 147258369),
(15, 'david', 'shlomi', 963852741);

-- --------------------------------------------------------

--
-- Table structure for table `workers_hours`
--

CREATE TABLE `workers_hours` (
  `id` int(11) NOT NULL,
  `month` varchar(10) NOT NULL,
  `eight_shift` int(2) NOT NULL,
  `twelve_shift` int(2) NOT NULL,
  `total_hours` int(4) NOT NULL,
  `total_shifts` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `workers_shift_report`
--

CREATE TABLE `workers_shift_report` (
  `id` int(11) NOT NULL,
  `shift_id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `gun_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `worker_prefs`
--

CREATE TABLE `worker_prefs` (
  `id` int(11) NOT NULL,
  `workerId` int(11) NOT NULL,
  `wdate` date NOT NULL,
  `shiftId` int(11) NOT NULL,
  `regionid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `worker_prefs`
--

INSERT INTO `worker_prefs` (`id`, `workerId`, `wdate`, `shiftId`, `regionid`) VALUES
(3, 10, '2021-08-08', 1, 1),
(4, 10, '2021-08-03', 2, 1),
(5, 10, '2021-08-05', 3, 1),
(6, 10, '2021-08-30', 2, 1),
(7, 10, '2021-09-05', 3, 1),
(8, 10, '2021-08-31', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `worker_private_details`
--

CREATE TABLE `worker_private_details` (
  `id` int(11) NOT NULL,
  `workerId` int(11) NOT NULL,
  `phone_number` varchar(105) NOT NULL,
  `additional_details` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `worker_private_details`
--

INSERT INTO `worker_private_details` (`id`, `workerId`, `phone_number`, `additional_details`) VALUES
(12, 10, ' 972528113697', 'Good Dude'),
(13, 11, '0542877086', ' Likes Working'),
(14, 12, '0523963182', 'nerd'),
(15, 13, '32165494', 'slow and old'),
(16, 14, '0523698715', 'matter'),
(17, 15, '05213647895', 'this');

-- --------------------------------------------------------

--
-- Table structure for table `worker_rota`
--

CREATE TABLE `worker_rota` (
  `id` int(11) NOT NULL,
  `workerId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `shiftId` int(11) NOT NULL,
  `wdate` date NOT NULL,
  `work` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `worker_work_details`
--

CREATE TABLE `worker_work_details` (
  `id` int(11) NOT NULL,
  `workerId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `transport` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `rank` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `worker_work_details`
--

INSERT INTO `worker_work_details` (`id`, `workerId`, `postId`, `transport`, `status`, `rank`) VALUES
(13, 10, 7, 'self', 'active', 'worker'),
(14, 11, 8, 'transport', 'active', 'worker'),
(15, 12, 6, 'self', '', 'boss'),
(16, 13, 12, 'self', 'active', 'worker'),
(17, 14, 7, 'self', 'active', 'shift manager'),
(18, 15, 7, 'transport', 'active', 'shift manager');

-- --------------------------------------------------------

--
-- Table structure for table `work_posts`
--

CREATE TABLE `work_posts` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `location` varchar(25) NOT NULL,
  `shift_manager` varchar(10) NOT NULL,
  `workers` int(2) NOT NULL,
  `regionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `work_posts`
--

INSERT INTO `work_posts` (`id`, `name`, `location`, `shift_manager`, `workers`, `regionId`) VALUES
(6, 'Rachel', 'beside bethlehem', '1', 6, 0),
(7, 'Azaim', 'beside Azaim', '1', 4, 1),
(8, 'zeitim', 'abu dis', '1', 3, 1),
(9, 'Tabaat', 'ring road', '1', 3, 10),
(10, 'Minharot', 'route 60', '1', 5, 0),
(11, 'ein yael', 'beside malha', '1', 2, 0),
(12, 'Sheikh Saed', 'Shaek Saed', '0', 2, 0),
(13, 'Sawahara', 'Sawahara', '0', 2, 0),
(14, 'Mizmorieh', 'beside Homat Shmuel', '0', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `write_ups`
--

CREATE TABLE `write_ups` (
  `id` int(10) NOT NULL,
  `issuer` int(10) NOT NULL,
  `issuee` int(10) NOT NULL,
  `reason` varchar(10) NOT NULL,
  `explanation` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logistics_report`
--
ALTER TABLE `logistics_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_logisticsreport_shift` (`shift_id`);

--
-- Indexes for table `post_shifts`
--
ALTER TABLE `post_shifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_auth`
--
ALTER TABLE `user_auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workers_hours`
--
ALTER TABLE `workers_hours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workers_shift_report`
--
ALTER TABLE `workers_shift_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_workerreport_shift` (`shift_id`);

--
-- Indexes for table `worker_prefs`
--
ALTER TABLE `worker_prefs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workerId` (`workerId`,`shiftId`,`regionid`),
  ADD KEY `shiftId` (`shiftId`),
  ADD KEY `worker_prefs_ibfk_3` (`regionid`);

--
-- Indexes for table `worker_private_details`
--
ALTER TABLE `worker_private_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_privatedetails_worker` (`workerId`);

--
-- Indexes for table `worker_rota`
--
ALTER TABLE `worker_rota`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shiftId` (`shiftId`),
  ADD KEY `postId` (`postId`),
  ADD KEY `workerId` (`workerId`);

--
-- Indexes for table `worker_work_details`
--
ALTER TABLE `worker_work_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_workerregion_region` (`postId`),
  ADD KEY `fk_workdetails_workers` (`workerId`);

--
-- Indexes for table `work_posts`
--
ALTER TABLE `work_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wpost_region` (`regionId`);

--
-- Indexes for table `write_ups`
--
ALTER TABLE `write_ups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_issuer_worker` (`issuer`),
  ADD KEY `fk_issuee_worker` (`issuee`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logistics_report`
--
ALTER TABLE `logistics_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `post_shifts`
--
ALTER TABLE `post_shifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `regions`
--
ALTER TABLE `regions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `workers_shift_report`
--
ALTER TABLE `workers_shift_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `worker_prefs`
--
ALTER TABLE `worker_prefs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `worker_private_details`
--
ALTER TABLE `worker_private_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `worker_rota`
--
ALTER TABLE `worker_rota`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `worker_work_details`
--
ALTER TABLE `worker_work_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `work_posts`
--
ALTER TABLE `work_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `write_ups`
--
ALTER TABLE `write_ups`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_address_addressId` FOREIGN KEY (`id`) REFERENCES `workers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `logistics_report`
--
ALTER TABLE `logistics_report`
  ADD CONSTRAINT `fk_logisticsreport_shift` FOREIGN KEY (`shift_id`) REFERENCES `post_shifts` (`id`);

--
-- Constraints for table `user_auth`
--
ALTER TABLE `user_auth`
  ADD CONSTRAINT `fk_auth_user` FOREIGN KEY (`id`) REFERENCES `workers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workers_hours`
--
ALTER TABLE `workers_hours`
  ADD CONSTRAINT `fk_hours_worker` FOREIGN KEY (`id`) REFERENCES `workers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workers_shift_report`
--
ALTER TABLE `workers_shift_report`
  ADD CONSTRAINT `fk_workerreport_shift` FOREIGN KEY (`shift_id`) REFERENCES `post_shifts` (`id`);

--
-- Constraints for table `worker_prefs`
--
ALTER TABLE `worker_prefs`
  ADD CONSTRAINT `worker_prefs_ibfk_1` FOREIGN KEY (`workerId`) REFERENCES `workers` (`id`),
  ADD CONSTRAINT `worker_prefs_ibfk_2` FOREIGN KEY (`shiftId`) REFERENCES `post_shifts` (`id`),
  ADD CONSTRAINT `worker_prefs_ibfk_3` FOREIGN KEY (`regionid`) REFERENCES `regions` (`id`);

--
-- Constraints for table `worker_private_details`
--
ALTER TABLE `worker_private_details`
  ADD CONSTRAINT `fk_privatedetails_worker` FOREIGN KEY (`workerId`) REFERENCES `workers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `worker_rota`
--
ALTER TABLE `worker_rota`
  ADD CONSTRAINT `worker_rota_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `work_posts` (`id`),
  ADD CONSTRAINT `worker_rota_ibfk_2` FOREIGN KEY (`workerId`) REFERENCES `workers` (`id`),
  ADD CONSTRAINT `worker_rota_ibfk_3` FOREIGN KEY (`shiftId`) REFERENCES `post_shifts` (`id`);

--
-- Constraints for table `worker_work_details`
--
ALTER TABLE `worker_work_details`
  ADD CONSTRAINT `fk_workdetails_workers` FOREIGN KEY (`workerId`) REFERENCES `workers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wdetails_wposts` FOREIGN KEY (`postId`) REFERENCES `work_posts` (`id`);

--
-- Constraints for table `work_posts`
--
ALTER TABLE `work_posts`
  ADD CONSTRAINT `wpost_region` FOREIGN KEY (`regionId`) REFERENCES `regions` (`id`);

--
-- Constraints for table `write_ups`
--
ALTER TABLE `write_ups`
  ADD CONSTRAINT `fk_issuee_worker` FOREIGN KEY (`issuee`) REFERENCES `workers` (`id`),
  ADD CONSTRAINT `fk_issuer_worker` FOREIGN KEY (`issuer`) REFERENCES `workers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
