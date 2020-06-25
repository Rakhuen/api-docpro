-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 25, 2020 at 10:15 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_docpro`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id_appointment` int(11) NOT NULL,
  `id_pasien` int(11) NOT NULL,
  `keperluan` varchar(30) NOT NULL,
  `tanggal` date NOT NULL,
  `jam` varchar(6) NOT NULL,
  `keluhan` varchar(100) NOT NULL,
  `is_checked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id_appointment`, `id_pasien`, `keperluan`, `tanggal`, `jam`, `keluhan`, `is_checked`) VALUES
(33, 58, 'Perawatan Gigi', '2020-06-26', '19:00', 'Gigi terasa kurang putih', 1),
(34, 59, 'Tambal Gigi', '2020-06-26', '18:00', 'Gigi belakang sakit kalo lagi ngunyah', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `appointment_details`
-- (See below for the actual view)
--
CREATE TABLE `appointment_details` (
`id_appointment` int(11)
,`keperluan` varchar(30)
,`tanggal` date
,`jam` varchar(6)
,`id_pasien` int(11)
,`nama` varchar(50)
,`url_photo` varchar(255)
,`is_checked` tinyint(1)
,`is_deleted` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `diagnosa`
--

CREATE TABLE `diagnosa` (
  `id_diagnosa` int(11) NOT NULL,
  `id_appointment` int(11) NOT NULL,
  `doctor` varchar(50) NOT NULL,
  `penanganan` varchar(100) NOT NULL,
  `services` varchar(100) NOT NULL,
  `drugs` varchar(100) NOT NULL,
  `total_biaya` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diagnosa`
--

INSERT INTO `diagnosa` (`id_diagnosa`, `id_appointment`, `doctor`, `penanganan`, `services`, `drugs`, `total_biaya`) VALUES
(32, 33, 'Putri', 'Membersihkan sela sela gigi', '9', '6,8', 160000),
(33, 34, 'Putri', 'Menambal sementara gigi graham belakang', '10', '8', 315000);

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id_doctor` int(11) NOT NULL,
  `npa` varchar(16) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(80) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `email` varchar(30) NOT NULL,
  `tanggal_lahir` varchar(30) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `url_photo` varchar(120) NOT NULL,
  `added_on` date NOT NULL,
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id_doctor`, `npa`, `nama`, `alamat`, `username`, `password`, `phone`, `email`, `tanggal_lahir`, `photo`, `url_photo`, `added_on`, `is_deleted`) VALUES
(22, '345567832', 'Gatot', 'Jakarta Raya', 'gatot09', '$2a$12$i0B5hn9iZq3297B5msv/IeAQbUSl1L/dUKSPvrJbKnUjXq/Fqij0m', '08523421234', 'gatot@yahoo.com', '17-08-1970', 'default.png', 'default.png', '2020-06-26', 0),
(23, '432567823', 'Putri', 'Bandung', 'putri12', '$2a$12$8qY3Snwj34z1YgdsWHBiO.oblKteh0juUthQztYzDTxVB0i7rESxm', '0813123456721', 'putri@docpro.com', '10-11-1991', '23-20200626-2256727a.jpg', 'http://res.cloudinary.com/dteyro1dc/image/upload/v1593109745/img-dokter/23-20200626-2256727a.jpg.jpg', '2020-06-26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `drugs`
--

CREATE TABLE `drugs` (
  `id_drug` int(11) NOT NULL,
  `drug_name` varchar(25) NOT NULL,
  `drug_desc` varchar(100) NOT NULL,
  `drug_price` int(11) NOT NULL,
  `drug_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drugs`
--

INSERT INTO `drugs` (`id_drug`, `drug_name`, `drug_desc`, `drug_price`, `drug_count`) VALUES
(6, 'Panadol', 'Obat sakit kepala', 10000, 46),
(7, 'Ganja', 'Buat kita santuy', 150000, 47),
(8, 'Ponstan', 'Obat sakit gigi', 15000, 49);

-- --------------------------------------------------------

--
-- Stand-in structure for view `history`
-- (See below for the actual view)
--
CREATE TABLE `history` (
`id_appointment` int(11)
,`id_pasien` int(11)
,`id_diagnosa` int(11)
,`keperluan` varchar(30)
,`tanggal` date
,`jam` varchar(6)
,`keluhan` varchar(100)
,`is_checked` tinyint(1)
,`nama` varchar(50)
,`nik` varchar(80)
,`tanggal_lahir` varchar(80)
,`alamat` varchar(255)
,`phone` varchar(80)
,`photo` varchar(50)
,`url_photo` varchar(255)
,`added_on` date
,`is_deleted` tinyint(1)
,`doctor` varchar(50)
,`penanganan` varchar(100)
,`services` varchar(100)
,`drugs` varchar(100)
,`total_biaya` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `pasien`
--

CREATE TABLE `pasien` (
  `id_pasien` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `nik` varchar(80) NOT NULL,
  `tanggal_lahir` varchar(80) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `phone` varchar(80) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `url_photo` varchar(255) NOT NULL,
  `added_on` date NOT NULL,
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pasien`
--

INSERT INTO `pasien` (`id_pasien`, `nama`, `nik`, `tanggal_lahir`, `alamat`, `phone`, `photo`, `url_photo`, `added_on`, `is_deleted`) VALUES
(58, 'User', 'ab477dfefee9d3c54dad1c5df9cce60ffa564d82b9dc9b3cf3aa4033d1a6f9a9', 'c6fef1e71de2d6b258d117aa582f32c4', '82d9f9e662bbfe6ca992871d6e4965c9', 'e2555df620a5eda79f4b54962caa81cb', '20200626-1b0530ca9773.jpg', 'http://res.cloudinary.com/dteyro1dc/image/upload/v1593109959/img-pasien/20200626-1b0530ca9773.jpg.jpg', '2020-06-26', 0),
(59, 'Anonymous', '9d776544be810760c1d6892419e8df59c476b26c6199d23459320fe562fa1780', '58d2a70e1da983e5b101f85badb98128', '696291d0dbaa7cbf5df4cd220da60375', '8e2cf041c3c5b5cfa8f897152d374f29', 'default.png', 'default.png', '2020-06-26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `photo_data`
--

CREATE TABLE `photo_data` (
  `id_photo` int(11) NOT NULL,
  `id_pasien` int(11) NOT NULL,
  `id_appointment` int(11) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `url_photo` varchar(120) NOT NULL,
  `is_checked` tinyint(1) NOT NULL,
  `added_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `photo_data`
--

INSERT INTO `photo_data` (`id_photo`, `id_pasien`, `id_appointment`, `photo`, `url_photo`, `is_checked`, `added_on`) VALUES
(24, 59, 34, '20200626-f2589ad2facc.jpg', 'http://res.cloudinary.com/dteyro1dc/image/upload/v1593112517/img-data/20200626-f2589ad2facc.jpg.jpg', 1, '2020-06-26');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id_service` int(11) NOT NULL,
  `service_name` varchar(50) NOT NULL,
  `service_desc` varchar(100) NOT NULL,
  `service_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id_service`, `service_name`, `service_desc`, `service_price`) VALUES
(8, 'Pasang Behel', 'Untuk meratakan gigi yang renggang', 2000000),
(9, 'Pembersih Karang Gigi', 'Gigi disemprot menggunakan cairan khusus', 150000),
(10, 'Tambal Gigi', 'Menambal gigi menggunakan kapas khusus', 300000);

-- --------------------------------------------------------

--
-- Structure for view `appointment_details`
--
DROP TABLE IF EXISTS `appointment_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `appointment_details`  AS  select `a`.`id_appointment` AS `id_appointment`,`a`.`keperluan` AS `keperluan`,`a`.`tanggal` AS `tanggal`,`a`.`jam` AS `jam`,`p`.`id_pasien` AS `id_pasien`,`p`.`nama` AS `nama`,`p`.`url_photo` AS `url_photo`,`a`.`is_checked` AS `is_checked`,`p`.`is_deleted` AS `is_deleted` from (`appointment` `a` join `pasien` `p` on(`p`.`id_pasien` = `a`.`id_pasien`)) order by `a`.`tanggal`,`a`.`jam` ;

-- --------------------------------------------------------

--
-- Structure for view `history`
--
DROP TABLE IF EXISTS `history`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `history`  AS  select `a`.`id_appointment` AS `id_appointment`,`p`.`id_pasien` AS `id_pasien`,`d`.`id_diagnosa` AS `id_diagnosa`,`a`.`keperluan` AS `keperluan`,`a`.`tanggal` AS `tanggal`,`a`.`jam` AS `jam`,`a`.`keluhan` AS `keluhan`,`a`.`is_checked` AS `is_checked`,`p`.`nama` AS `nama`,`p`.`nik` AS `nik`,`p`.`tanggal_lahir` AS `tanggal_lahir`,`p`.`alamat` AS `alamat`,`p`.`phone` AS `phone`,`p`.`photo` AS `photo`,`p`.`url_photo` AS `url_photo`,`p`.`added_on` AS `added_on`,`p`.`is_deleted` AS `is_deleted`,`d`.`doctor` AS `doctor`,`d`.`penanganan` AS `penanganan`,`d`.`services` AS `services`,`d`.`drugs` AS `drugs`,`d`.`total_biaya` AS `total_biaya` from ((`appointment` `a` join `pasien` `p` on(`p`.`id_pasien` = `a`.`id_pasien`)) join `diagnosa` `d` on(`d`.`id_appointment` = `a`.`id_appointment`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id_appointment`);

--
-- Indexes for table `diagnosa`
--
ALTER TABLE `diagnosa`
  ADD PRIMARY KEY (`id_diagnosa`),
  ADD KEY `id_appointment` (`id_appointment`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id_doctor`);

--
-- Indexes for table `drugs`
--
ALTER TABLE `drugs`
  ADD PRIMARY KEY (`id_drug`);

--
-- Indexes for table `pasien`
--
ALTER TABLE `pasien`
  ADD PRIMARY KEY (`id_pasien`);

--
-- Indexes for table `photo_data`
--
ALTER TABLE `photo_data`
  ADD PRIMARY KEY (`id_photo`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id_service`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id_appointment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `diagnosa`
--
ALTER TABLE `diagnosa`
  MODIFY `id_diagnosa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id_doctor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `drugs`
--
ALTER TABLE `drugs`
  MODIFY `id_drug` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id_pasien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `photo_data`
--
ALTER TABLE `photo_data`
  MODIFY `id_photo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id_service` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
