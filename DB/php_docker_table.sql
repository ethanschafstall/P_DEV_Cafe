-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Sep 09, 2022 at 08:49 PM
-- Server version: 8.0.30
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS php_docker;
USE php_docker;

-- Table des produits
CREATE TABLE IF NOT EXISTS produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    quantite_stock INT NOT NULL
);

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mot_de_passe VARCHAR(100) NOT NULL,
    credit DECIMAL(10, 2) DEFAULT 0
);

-- Table des transactions
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT,
    id_produit INT,
    quantite INT NOT NULL,
    montant_total DECIMAL(10, 2) NOT NULL,
    date_transaction TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id),
    FOREIGN KEY (id_produit) REFERENCES produits(id)
);

-- Insertion de données de test dans les tables
INSERT INTO produits (nom, description, prix, quantite_stock) VALUES
('Café Arabica', 'Café Arabica de première qualité', 9.99, 100),
('Café Robusta', 'Café Robusta intense', 8.49, 80),
('Café Décaféiné', 'Café sans caféine pour les amateurs de goût', 10.99, 50);

INSERT INTO utilisateurs (nom, email, mot_de_passe, credit) VALUES
('Jean Dupont', 'jean@example.com', 'motdepasse123', 100),
('Marie Martin', 'marie@example.com', 'mdp_marie', 150),
('Pierre Dubois', 'pierre@example.com', 'dubois123', 200);

INSERT INTO transactions (id_utilisateur, id_produit, quantite, montant_total) VALUES
(1, 1, 2, 19.98),
(2, 3, 1, 10.99),
(3, 2, 3, 25.47);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
COMMIT;




-- -- phpMyAdmin SQL Dump
-- -- version 5.2.0
-- -- https://www.phpmyadmin.net/
-- --
-- -- Host: db:3306
-- -- Generation Time: Sep 09, 2022 at 08:49 PM
-- -- Server version: 8.0.30
-- -- PHP Version: 8.0.19

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- START TRANSACTION;
-- SET time_zone = "+00:00";


-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!40101 SET NAMES utf8mb4 */;

-- --
-- -- Database: `php_docker`
-- --

-- -- --------------------------------------------------------

-- --
-- -- Table structure for table `php_docker_table`
-- --

-- CREATE TABLE `php_docker_table` (
--   `id` int NOT NULL,
--   `title` varchar(255) NOT NULL,
--   `body` text NOT NULL,
--   `date_created` date NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- Dumping data for table `php_docker_table`
-- --

-- INSERT INTO `php_docker_table` (`id`, `title`, `body`, `date_created`) VALUES
-- (1, 'first post', 'first body text', '2022-09-01'),
-- (2, 'second post', 'second body text', '2022-09-03');

-- --
-- -- Indexes for dumped tables
-- --

-- --
-- -- Indexes for table `php_docker_table`
-- --
-- ALTER TABLE `php_docker_table`
--   ADD PRIMARY KEY (`id`);

-- --
-- -- AUTO_INCREMENT for dumped tables
-- --

-- --
-- -- AUTO_INCREMENT for table `php_docker_table`
-- --
-- ALTER TABLE `php_docker_table`
--   MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
-- COMMIT;

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
