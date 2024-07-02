-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 02 juil. 2024 à 16:54
-- Version du serveur : 10.3.39-MariaDB-0+deb10u2
-- Version de PHP : 8.3.3-1+0~20240216.17+debian10~1.gbp87e37b

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `saas`
--

-- --------------------------------------------------------

--
-- Structure de la table `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `company`
--

INSERT INTO `company` (`id`, `owner_id`, `name`) VALUES
(3, 2, 'Google');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20240621181352', '2024-06-21 18:14:00', 82),
('DoctrineMigrations\\Version20240621181639', '2024-06-21 18:16:42', 297),
('DoctrineMigrations\\Version20240621181927', '2024-06-21 18:19:29', 174),
('DoctrineMigrations\\Version20240621214959', '2024-06-21 21:50:09', 264),
('DoctrineMigrations\\Version20240622121420', '2024-06-22 12:14:29', 141),
('DoctrineMigrations\\Version20240622164815', '2024-06-22 16:48:23', 162),
('DoctrineMigrations\\Version20240622165058', '2024-06-22 16:51:00', 36);

-- --------------------------------------------------------

--
-- Structure de la table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `birth_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `email` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `address` longtext NOT NULL,
  `hired_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `job_title` varchar(255) NOT NULL,
  `salary` double NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `employees`
--

INSERT INTO `employees` (`id`, `company_id`, `first_name`, `last_name`, `birth_at`, `email`, `phone_number`, `address`, `hired_at`, `job_title`, `salary`, `status`, `created_at`, `updated_at`) VALUES
(8, 3, 'Badyss', 'Blilita', '2006-03-11 00:00:00', 'badyss.blt@gmail.com', 666243443, 'Troyes', '2024-06-21 00:00:00', 'Développeur FullStack', 28, 'Active', '2024-06-30 23:24:36', '2024-06-30 23:24:36'),
(11, 3, 'Badyss', 'Blilita', '2024-07-25 00:00:00', 'badyss.blt@gmail.com', 666243443, 'etrqsd', '2024-07-02 00:00:00', 'qsd', 14, 'Active', '2024-07-02 14:27:26', '2024-07-02 14:27:26');

-- --------------------------------------------------------

--
-- Structure de la table `leave`
--

CREATE TABLE `leave` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `started_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `end_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `leave_type`
--

CREATE TABLE `leave_type` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`) VALUES
(2, 'test@gmail.com', '[\"ROLE_USER\"]', '$2y$13$ahfhSQILf5ZOWBX2xjJY0eDecHFAdLS5LslRr6KPrPmrQfnH9qLDi'),
(3, 'test2@gmail.com', '[]', '$2y$13$1ZS9/fT2YaTspXhsTztcBung2gjayBHqoCL9gVBDUqjpx/CICxxD6');

-- --------------------------------------------------------

--
-- Structure de la table `work_day`
--

CREATE TABLE `work_day` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `date` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `hours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `work_day`
--

INSERT INTO `work_day` (`id`, `employee_id`, `date`, `hours`) VALUES
(22, 8, '2024-06-30 23:25:15', 9),
(23, 8, '2024-06-30 23:25:56', 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_4FBF094F7E3C61F9` (`owner_id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_BA82C300979B1AD6` (`company_id`);

--
-- Index pour la table `leave`
--
ALTER TABLE `leave`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9BB080D08C03F15C` (`employee_id`);

--
-- Index pour la table `leave_type`
--
ALTER TABLE `leave_type`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`);

--
-- Index pour la table `work_day`
--
ALTER TABLE `work_day`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9FCE7E0C8C03F15C` (`employee_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `leave`
--
ALTER TABLE `leave`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `leave_type`
--
ALTER TABLE `leave_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `work_day`
--
ALTER TABLE `work_day`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `FK_4FBF094F7E3C61F9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `FK_BA82C300979B1AD6` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`);

--
-- Contraintes pour la table `leave`
--
ALTER TABLE `leave`
  ADD CONSTRAINT `FK_9BB080D08C03F15C` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);

--
-- Contraintes pour la table `work_day`
--
ALTER TABLE `work_day`
  ADD CONSTRAINT `FK_9FCE7E0C8C03F15C` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
