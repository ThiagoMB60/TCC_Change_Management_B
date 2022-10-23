-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.26 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para tcc
CREATE DATABASE IF NOT EXISTS `tcc` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tcc`;

-- Copiando estrutura para tabela tcc.category
CREATE TABLE IF NOT EXISTS `category` (
  `category` varchar(30) NOT NULL,
  PRIMARY KEY (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela tcc.category: ~0 rows (aproximadamente)
DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Copiando estrutura para tabela tcc.change
CREATE TABLE IF NOT EXISTS `change` (
  `id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela tcc.change: ~0 rows (aproximadamente)
DELETE FROM `change`;
/*!40000 ALTER TABLE `change` DISABLE KEYS */;
/*!40000 ALTER TABLE `change` ENABLE KEYS */;

-- Copiando estrutura para tabela tcc.module
CREATE TABLE IF NOT EXISTS `module` (
  `module` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`module`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela tcc.module: ~0 rows (aproximadamente)
DELETE FROM `module`;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` (`module`) VALUES
	('BASE.FDB - Banco de Dados'),
	('NFCe - Módulo emissor de Notas Fiscais Eletrônicas do Consumidor'),
	('NFe - Módulo emissor de Notas Fiscais Eletrônicas'),
	('ProLoja - Siscom');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;

-- Copiando estrutura para tabela tcc.moduleversions
CREATE TABLE IF NOT EXISTS `moduleversions` (
  `id` varchar(50) NOT NULL,
  `version` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `module` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_VERS_MODULE` (`module`),
  CONSTRAINT `FK_VERS_MODULE` FOREIGN KEY (`module`) REFERENCES `module` (`module`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela tcc.moduleversions: ~0 rows (aproximadamente)
DELETE FROM `moduleversions`;
/*!40000 ALTER TABLE `moduleversions` DISABLE KEYS */;
/*!40000 ALTER TABLE `moduleversions` ENABLE KEYS */;

-- Copiando estrutura para tabela tcc.requester
CREATE TABLE IF NOT EXISTS `requester` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `contact` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `company` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `comments` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela tcc.requester: ~12 rows (aproximadamente)
DELETE FROM `requester`;
/*!40000 ALTER TABLE `requester` DISABLE KEYS */;
INSERT INTO `requester` (`id`, `name`, `mail`, `contact`, `company`, `comments`) VALUES
	('05b9db4a-674e-432a-ba61-d2b761730611', 'Loide ', 'lode@oijadisdbasd', '561561561', 'Dular', 'Casa'),
	('37859c8c-4e37-47e7-b451-38744b4a4c9a', 'Luccas Moreira Batalha', 'thiagomoreira60@gmail.com', '3235412161', 'CucaBrasil', 'Suporte'),
	('4003a843-321e-4b88-8245-4a652d3eebbe', 'Joao', 'svitoria@ahuidsahd', '5465654564', 'Goldem Soluções', ''),
	('e91e1d75-5226-4664-a78a-c1b3f42ee7ea', 'Fred', 'joabe@cucabrasil.com.br', '321561515156 /5156156 /515 ', 'CucaBrasil', 'Desenvolvedor'),
	('fad5ab14-5012-11ed-bdc3-0242ac120002\r\n\r\n', 'Vitória', 'svitoria@ahuidsahd', '5465654564', 'Goldem Soluções', ''),
	('fad5aea2-5012-11ed-bdc3-0242ac120002\r\n\r\n', 'maria', 'svitoria@ahuidsahd', '5465654564', 'Goldem Soluções', ''),
	('fad5b320-5012-11ed-bdc3-0242ac120002', 'Marcos', 'joabe@cucabrasil.com.br', '321561515156 /5156156 /515 ', 'CucaBrasil', 'Desenvolvedor'),
	('fad5b898-5012-11ed-bdc3-0242ac120002', 'Joabe', 'joabe@cucabrasil.com.br', '321561515156 /5156156 /515 ', 'CucaBrasil', 'Desenvolvedor'),
	('fad5ba8c-5012-11ed-bdc3-0242ac120002\r\n\r\n', 'Robert Moreira Batalha', 'thiagomoreira60@gmail.com', '3235412161', 'CucaBrasil', 'Suporte'),
	('fad5bc58-5012-11ed-bdc3-0242ac120002\r\n\r\n', 'Thiago Moreira Batalha', 'thiagomoreira60@gmail.com', '3235412161', 'CucaBrasil', 'Suporte'),
	('fad5be10-5012-11ed-bdc3-0242ac120002\r\n\r\n', 'Loide Batalha', 'lode@oijadisdbasd', '561561561', 'Dular', 'Casa'),
	('fad5c2de-5012-11ed-bdc3-0242ac120002\r\n\r\n', 'Loide Moreira', 'lode@oijadisdbasd', '561561561', 'Dular', 'Casa');
/*!40000 ALTER TABLE `requester` ENABLE KEYS */;

-- Copiando estrutura para tabela tcc.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `active` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela tcc.user: ~8 rows (aproximadamente)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `user`, `pass`, `mail`, `type`, `active`) VALUES
	('226be487-5635-4192-8468-6c287685c953', 'vitoria', 'U2FsdGVkX1+GTKJZnlpvy6f023JiPGX4AQINZ/8XgcE=', 'svitoria@gmail.com/alterado', 'USER', 1),
	('64e4a235-e9b5-497b-9c80-f23c9e9432c5', 'rafael', 'U2FsdGVkX18Bruts6RSLOQSXoN6YMphk2/ieslVQMp0=', 'rafael@gmail.com', 'ADM', 0),
	('675c140a-4635-419b-838a-83baab64c08b', 'thiago', 'U2FsdGVkX1+JKCjSWcgX6YSc2VIylgERVaG3XMVfNSk=', 'svitoria@gmail.co', 'ADM', 1),
	('6b7d815a-d770-461c-b04f-a9ffbba58bbe', 'robert', 'U2FsdGVkX1+oKbOADp2BgXThQ6aI5jx+yB+HlAhag8I=', 'robert@gmail.com', 'USER', 1),
	('8e7a7ac8-ca41-429e-a2b8-bcbdbfd417db', 'loide', 'U2FsdGVkX1+pDZUnT9g6tQoXtIspkf05Cw67uYIWVeE=', 'loide@gmail.com', 'ADM', 1),
	('bb139c77-5a5b-455e-96f1-6f87a79c0f3c', 'lucas', 'U2FsdGVkX194BjkgnJe8/ctvV74aSsyttENysPSKGL8=', 'lucas@gmail.com', 'USER', 1),
	('e81d919d-9154-4e90-99b1-099e7688bbd4', 'adm', 'U2FsdGVkX19GTGy9X3Ra2TCYP6HWQwGtuzfCCokYOE0=', 'adm@gmail.com', 'ADM', 1),
	('e958b855-d768-4c09-8c1f-42382b187b21', 'roberto', 'U2FsdGVkX18+Nu9Fj8B7Vli3gjbiOGxaBNfYa09XC2E=', 'roberto@gmail.com', 'ADM', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
