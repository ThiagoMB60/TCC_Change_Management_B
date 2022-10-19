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

-- Copiando estrutura para tabela tcc.requester
CREATE TABLE IF NOT EXISTS `requester` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `company` varchar(50) NOT NULL,
  `comments` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela tcc.requester: ~0 rows (aproximadamente)
DELETE FROM `requester`;
/*!40000 ALTER TABLE `requester` DISABLE KEYS */;
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

-- Copiando dados para a tabela tcc.user: ~9 rows (aproximadamente)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `user`, `pass`, `mail`, `type`, `active`) VALUES
	('226be487-5635-4192-8468-6c287685c953', 'vitoria', 'U2FsdGVkX1+GTKJZnlpvy6f023JiPGX4AQINZ/8XgcE=', 'svitoria@gmail.com/alterado', 'USER', 1),
	('64e4a235-e9b5-497b-9c80-f23c9e9432c5', 'rafael', 'U2FsdGVkX18Bruts6RSLOQSXoN6YMphk2/ieslVQMp0=', 'rafael@gmail.com', 'ADM', 0),
	('675c140a-4635-419b-838a-83baab64c08b', 'thiago', 'U2FsdGVkX1+JKCjSWcgX6YSc2VIylgERVaG3XMVfNSk=', 'svitoria@gmail.co', 'ADM', 1),
	('6b7d815a-d770-461c-b04f-a9ffbba58bbe', 'robert', 'U2FsdGVkX1+oKbOADp2BgXThQ6aI5jx+yB+HlAhag8I=', 'robert@gmail.com', 'USER', 1),
	('8e7a7ac8-ca41-429e-a2b8-bcbdbfd417db', 'loide', 'U2FsdGVkX1+pDZUnT9g6tQoXtIspkf05Cw67uYIWVeE=', 'loide@gmail.com', 'ADM', 1),
	('bb139c77-5a5b-455e-96f1-6f87a79c0f3c', 'lucas', 'U2FsdGVkX194BjkgnJe8/ctvV74aSsyttENysPSKGL8=', 'lucas@gmail.com', 'USER', 1),
	('db076fda-0635-4eac-af02-1fcba910366b', 'felipe', 'U2FsdGVkX1/sARD/0i7v/U09Y1fQQSbFS/8ghqkYNhQ=', 'padovani@gmail.com', 'USER', 0),
	('e81d919d-9154-4e90-99b1-099e7688bbd4', 'adm', 'U2FsdGVkX19GTGy9X3Ra2TCYP6HWQwGtuzfCCokYOE0=', 'adm@gmail.com', 'ADM', 1),
	('e958b855-d768-4c09-8c1f-42382b187b21', 'roberto', 'U2FsdGVkX18+Nu9Fj8B7Vli3gjbiOGxaBNfYa09XC2E=', 'roberto@gmail.com', 'ADM', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
