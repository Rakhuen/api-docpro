-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 08, 2020 at 03:03 PM
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
(13, 47, 'Perawatan Gigi', '2020-06-08', '18:00', 'Rutin perawatan gigi', 1),
(15, 48, 'Perawatan Gigi', '2020-06-08', '19:00', 'Rutin perawatan gigi', 1);

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
,`photo` varchar(255)
,`is_checked` tinyint(1)
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
  `total_biaya` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `diagnosa`
--

INSERT INTO `diagnosa` (`id_diagnosa`, `id_appointment`, `doctor`, `penanganan`, `total_biaya`) VALUES
(15, 13, 'kim jiho', 'Membersihkan karang gigi', 500000),
(16, 15, 'kim jiho', 'Membersihkan jigong', 500000);

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
(17, '123.321.432', 'Dr Sufyan', 'Jl Damai 3a Jakarta Selatan', 'ahmadsufyan98', '$2a$12$JLc2K.RrHeBEsNSp9FkGg.QF4F35GCAKPEIbnWWYjGDViiapNhMJK', '081314113515', 'sufyan@docpro.com', 'Senin, 9 November 1998', '17-2020067-7d1e40d3.jpg', 'http://res.cloudinary.com/dteyro1dc/image/upload/v1591537069/img-dokter/17-2020067-7d1e40d3.jpg.jpg', '2020-05-21', 0),
(19, '12344212', 'kim jiho', 'Seoul', 'jiho09', '$2a$12$dxRjB7y6X/7DlmFNo5uC6.sKppJR9OgVuxHVvPtRlvB5ZytXxtuIa', '067332243', 'jiho@docpro.com', '4 Mei 1997', '19-2020068-33992e4c.jpg', 'http://res.cloudinary.com/dteyro1dc/image/upload/v1591603938/img-dokter/19-2020068-33992e4c.jpg.jpg', '2020-06-08', 0);

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
(4, 'Ganja', 'Obat yang bikin kita santuy', 200000, 10),
(6, 'Panadol', 'Obat sakit kepala', 10000, 50);

-- --------------------------------------------------------

--
-- Stand-in structure for view `history`
-- (See below for the actual view)
--
CREATE TABLE `history` (
`id_pasien` int(11)
,`nama` varchar(50)
,`nik` varchar(80)
,`tanggal_lahir` varchar(80)
,`alamat` varchar(255)
,`phone` varchar(80)
,`url_photo` varchar(255)
,`is_deleted` tinyint(1)
,`id_appointment` int(11)
,`keperluan` varchar(30)
,`tanggal` date
,`jam` varchar(6)
,`keluhan` varchar(100)
,`is_checked` tinyint(1)
,`id_diagnosa` int(11)
,`penanganan` varchar(100)
,`doctor` varchar(50)
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
(47, 'test', '421e6f728fecf635044e2a63b70bfb5e0aa5dc83b7f27a022f578ac2d6fa25a1', 'aee0bd769615dc04eb68ec7d9b07a153', '3e5ab8aa8f24d9a96eaa1d6bc088d14c69b8b9fda1eee416f8c1a5a262e42430c5c0be0df67b4c4231c717e36bc8b328b0714bac06b8461d7b49eb500d2b97f5f0fa42a1c27c0ed3cfddae8c4eeef61e228087269adf8f0116a0d2f9c28a1414e4fd0aa119c5f792c31e58910f1a8278', 'efa13b08dcd9dd7825844af9c871b8f0', '', '', '2020-06-08', 0),
(48, 'test2', 'afce683dfaf44e1947ccae6aade01371f3c36038a93c718eedca63864654a4b1', '3b50ab0c0e10e3ed724bd8bbcd15714a', '488527c95cf0b7b7ff855f2beef042a0db37079a3df056aca4b8032167739bafcd93f64366cefe65e6e41bff0adeeb1361c37863af88492cae1ee55f0406556fc37222732236a0cd4d3e0805d1e4c468780799a00a27427bac60ee264ee67b34967e41027a593dce262b92fc517d9a35', '750262346e4b10adbc8136596869745b', '2020068-c9b035f6b706.jpg', 'http://res.cloudinary.com/dteyro1dc/image/upload/v1591620387/img-pasien/2020068-c9b035f6b706.jpg.jpg', '2020-06-08', 0);

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
(19, 47, 13, '2020068-ef8e939a3d8e.jpg', 'http://res.cloudinary.com/dteyro1dc/image/upload/v1591613830/img-data/2020068-ef8e939a3d8e.jpg.jpg', 1, '2020-06-08');

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
(7, 'Cabut Gigi', 'Gigi graham belakang dicopot, tetapi masih ada sebagian yang menempel', 700000);

-- --------------------------------------------------------

--
-- Structure for view `appointment_details`
--
DROP TABLE IF EXISTS `appointment_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `appointment_details`  AS  select `a`.`id_appointment` AS `id_appointment`,`a`.`keperluan` AS `keperluan`,`a`.`tanggal` AS `tanggal`,`a`.`jam` AS `jam`,`a`.`id_pasien` AS `id_pasien`,`p`.`nama` AS `nama`,`p`.`url_photo` AS `photo`,`a`.`is_checked` AS `is_checked` from (`appointment` `a` join `pasien` `p` on(`p`.`id_pasien` = `a`.`id_pasien`)) order by `a`.`jam` ;

-- --------------------------------------------------------

--
-- Structure for view `history`
--
DROP TABLE IF EXISTS `history`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `history`  AS  select `p`.`id_pasien` AS `id_pasien`,`p`.`nama` AS `nama`,`p`.`nik` AS `nik`,`p`.`tanggal_lahir` AS `tanggal_lahir`,`p`.`alamat` AS `alamat`,`p`.`phone` AS `phone`,`p`.`url_photo` AS `url_photo`,`p`.`is_deleted` AS `is_deleted`,`a`.`id_appointment` AS `id_appointment`,`a`.`keperluan` AS `keperluan`,`a`.`tanggal` AS `tanggal`,`a`.`jam` AS `jam`,`a`.`keluhan` AS `keluhan`,`a`.`is_checked` AS `is_checked`,`d`.`id_diagnosa` AS `id_diagnosa`,`d`.`penanganan` AS `penanganan`,`d`.`doctor` AS `doctor`,`d`.`total_biaya` AS `total_biaya` from ((`appointment` `a` join `pasien` `p` on(`p`.`id_pasien` = `a`.`id_pasien`)) join `diagnosa` `d` on(`d`.`id_appointment` = `a`.`id_appointment`)) ;

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
  MODIFY `id_appointment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `diagnosa`
--
ALTER TABLE `diagnosa`
  MODIFY `id_diagnosa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id_doctor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `drugs`
--
ALTER TABLE `drugs`
  MODIFY `id_drug` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pasien`
--
ALTER TABLE `pasien`
  MODIFY `id_pasien` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `photo_data`
--
ALTER TABLE `photo_data`
  MODIFY `id_photo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id_service` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
