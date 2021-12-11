-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le : sam. 11 déc. 2021 à 09:03
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomaniadb_development`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `messageId` int(11) NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_ibfk_2` (`messageId`),
  KEY `comments_ibfk_1` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `content`, `userId`, `messageId`, `updatedAt`, `createdAt`) VALUES
(22, ' J\'y serai, on se retrouve quelque part ? ', 2, 2, '2021-12-04 12:49:13', '2021-12-01 19:33:23'),
(61, 'Oui on peut se retrouver où a lieu le départ de la course', 3, 2, '2021-12-02 10:20:50', '2021-12-02 10:20:50'),
(62, 'Ça a l\'air excellent !!', 3, 1, '2021-12-06 07:27:11', '2021-12-02 10:21:30'),
(64, 'Ok !', 2, 2, '2021-12-03 09:05:19', '2021-12-03 09:05:19'),
(70, 'J\'avoue !', 11, 1, '2021-12-05 10:30:19', '2021-12-05 10:30:19'),
(71, 'Dommage, je serai absent ce jour là ...', 11, 2, '2021-12-05 10:31:31', '2021-12-05 10:31:31'),
(78, 'j\'y serai ! ;)', 5, 21, '2021-12-05 14:31:02', '2021-12-05 14:31:02'),
(79, 'Je viens aussi, mais j\'aurai un peu de retard ...', 2, 21, '2021-12-05 14:32:30', '2021-12-05 14:32:30'),
(80, 'Mince, je ne pourrai pas venir ! :(', 3, 21, '2021-12-05 14:33:08', '2021-12-05 14:33:08'),
(81, 'Pas de soucis Elodie, c\'est dommage.', 11, 21, '2021-12-05 14:34:01', '2021-12-05 14:34:01'),
(195, '', 5, 2, '2021-12-08 14:36:21', '2021-12-08 14:36:21');

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_ibfk_1` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `title`, `content`, `attachment`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'Une sauce tomate', 'Je vous parle d\'une sauce tomate !', 'http://localhost:3000/images-mess/sauce_tomate.jpg1638186459121.jpg', '2021-11-29 11:47:39', '2021-12-03 09:05:31', 2),
(2, 'Marathon de Paris', 'Hello, qui veut venir voir le marathon de Paris avec moi ? ', NULL, '2021-11-29 11:49:59', '2021-11-29 11:49:59', 3),
(21, 'Event d\'entreprise', 'Bonjour tout le monde ! \nGroupomania organise le 15 décembre à 19h une soirée jeux avec un repas sur le thème de noël ! Le repas commencera à 19h30. Vous êtes libre de venir après le repas. J\'ai besoin de savoir qui souhaite venir au repas, merci ! :)  ', 'http://localhost:3000/images-mess/noel.jpg1638714633946.jpg', '2021-12-05 14:30:33', '2021-12-05 14:30:33', 11);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `picture`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(2, 'thibaud@gmail.com', 'Thibaud', '$2b$10$jUPqKPkRNPcXdcMgjSHNMObqHQLnEroNgKCOzO6x7ZBOwvtbFyD5C', 'http://localhost:3000/images-prof/user_3.jpg1638536416090.jpg', 'Bonjour ! Je m\'appelle Thibaud !', 0, '2021-11-29 11:45:06', '2021-12-03 13:00:16'),
(3, 'elodie@gmail.com', 'Elodie', '$2b$10$5kjCezlN6xygDo6Lyo4zf.gU2o/f2Hid4DDs5VhyAePufHDliPfwS', 'http://localhost:3000/images-prof/user_2.jpg1638186634886.jpg', 'Hello, je m\'appelle Elodie, ravi d\'être ici ! :) ', 0, '2021-11-29 11:47:58', '2021-11-29 11:50:54'),
(5, 'admin@gmail.com', '[ADMIN] Nicolas', '$2b$10$k.1VWcy6hlAOcDXVz3aT2uF34dVu8M1IZ76AKeUnj9Xt3/Werrhv.', 'http://localhost:3000/images-prof/admin_picture.jpg1638538813502.jpg', 'Bonjour. Je suis l\'administrateur du réseau Goupomania.', 1, '2021-12-03 11:32:14', '2021-12-04 10:08:18'),
(11, 'benjamin@gmail.com', 'Benjamin', '$2b$10$Ywj9.JIDYk/0cKTId0CE5Oy/Q7CgLFX8ZUehGlQoQLRaS0.Ry1Rz.', 'http://localhost:3000/images-prof/user_1.jpg1638700149819.jpg', 'Hello ! \nje m\'appelle Benjamin, je travaille dans la section RH.\nBonne journée à tous ! :) ', 0, '2021-12-05 09:44:48', '2021-12-05 10:33:33'),
(12, 'sqdqs@gmail.com', 'dsq', '$2b$10$ry/2Xbf6y8oe1LfMcA7MHucAhH2txguDa6QpEm/DLzmNVOSzCZpDm', NULL, NULL, 0, '2021-12-11 08:52:08', '2021-12-11 08:52:08');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`messageId`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
