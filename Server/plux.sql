-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.0-dmr-log - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Copiando estrutura para tabela plux.banco_horas
CREATE TABLE IF NOT EXISTS `banco_horas` (
  `banch_id` int(11) NOT NULL AUTO_INCREMENT,
  `banch_nome` varchar(50) DEFAULT NULL,
  `banch_horario` varchar(50) DEFAULT NULL,
  `banch_date` varchar(50) DEFAULT NULL,
  `banch_localizacao` varchar(45) DEFAULT NULL,
  `banch_codigo` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`banch_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela plux.banco_horas: ~-1 rows (aproximadamente)
/*!40000 ALTER TABLE `banco_horas` DISABLE KEYS */;
INSERT INTO `banco_horas` (`banch_id`, `banch_nome`, `banch_horario`, `banch_date`, `banch_localizacao`, `banch_codigo`) VALUES
	(35, 'Lindson Cardoso', '15:20:19', '22/11/2021', NULL, NULL),
	(36, 'lindson', '18:15:53', '25/11/2021', NULL, NULL),
	(37, 'lindson', '21:46', '26/03/2022', NULL, '4561');
/*!40000 ALTER TABLE `banco_horas` ENABLE KEYS */;

-- Copiando estrutura para tabela plux.cad_empresa
CREATE TABLE IF NOT EXISTS `cad_empresa` (
  `emp_id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_nomefantasia` varchar(45) DEFAULT NULL,
  `emp_razaosocial` varchar(42) DEFAULT NULL,
  `emp_email` varchar(31) DEFAULT NULL,
  `emp_cnpj` varchar(45) DEFAULT NULL,
  `emp_telefone` varchar(45) DEFAULT NULL,
  `emp_ramoatividade` varchar(45) DEFAULT NULL,
  `emp_logradouro` varchar(50) DEFAULT NULL,
  `emp_bairro` varchar(50) DEFAULT NULL,
  `emp_numero` varchar(50) DEFAULT NULL,
  `emp_complemento` varchar(50) DEFAULT NULL,
  `emp_cidade` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`emp_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela plux.cad_empresa: ~-1 rows (aproximadamente)
/*!40000 ALTER TABLE `cad_empresa` DISABLE KEYS */;
INSERT INTO `cad_empresa` (`emp_id`, `emp_nomefantasia`, `emp_razaosocial`, `emp_email`, `emp_cnpj`, `emp_telefone`, `emp_ramoatividade`, `emp_logradouro`, `emp_bairro`, `emp_numero`, `emp_complemento`, `emp_cidade`) VALUES
	(1, 'ZTECNOLOGIA', 'ZLTECNOLOGIA E SOLUÇOES', 'zltecnologia@contato.com.br', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `cad_empresa` ENABLE KEYS */;

-- Copiando estrutura para tabela plux.cad_funcionarios
CREATE TABLE IF NOT EXISTS `cad_funcionarios` (
  `fun_id` int(11) NOT NULL AUTO_INCREMENT,
  `fun_codigo` varchar(4) DEFAULT NULL,
  `fun_nome` varchar(45) DEFAULT NULL,
  `fun_email` varchar(45) DEFAULT NULL,
  `fun_cpf` varchar(45) DEFAULT NULL,
  `fun_login` varchar(45) DEFAULT NULL,
  `fun_senha` varchar(45) DEFAULT NULL,
  `fun_whatsapp` varchar(45) DEFAULT NULL,
  `fun_data` varchar(45) DEFAULT NULL,
  `fun_ativo` varchar(45) DEFAULT NULL,
  `fun_tipo` varchar(45) DEFAULT NULL,
  `cad_funcionarioscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`fun_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela plux.cad_funcionarios: ~-1 rows (aproximadamente)
/*!40000 ALTER TABLE `cad_funcionarios` DISABLE KEYS */;
INSERT INTO `cad_funcionarios` (`fun_id`, `fun_codigo`, `fun_nome`, `fun_email`, `fun_cpf`, `fun_login`, `fun_senha`, `fun_whatsapp`, `fun_data`, `fun_ativo`, `fun_tipo`, `cad_funcionarioscol`) VALUES
	(16, '3940', 'Lindson Cardoso', 'lindsoncardoso.al@gmail.com', '213131231312', NULL, NULL, '12313213', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `cad_funcionarios` ENABLE KEYS */;

-- Copiando estrutura para tabela plux.cad_usuario
CREATE TABLE IF NOT EXISTS `cad_usuario` (
  `usu_id` int(11) NOT NULL AUTO_INCREMENT,
  `usu_nome` varchar(45) DEFAULT NULL,
  `usu_login` varchar(45) DEFAULT NULL,
  `usu_senha` varchar(45) DEFAULT NULL,
  `usu_status` char(1) DEFAULT NULL,
  `usu_email` varchar(45) DEFAULT NULL,
  `grp_id` int(11) DEFAULT NULL,
  `usu_avatar` blob,
  `usu_perfil` varchar(3) DEFAULT NULL,
  `usu_whatsapp` varchar(50) DEFAULT NULL,
  `usu_cpf` varchar(50) DEFAULT NULL,
  `usu_codigo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`usu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela plux.cad_usuario: ~-1 rows (aproximadamente)
/*!40000 ALTER TABLE `cad_usuario` DISABLE KEYS */;
INSERT INTO `cad_usuario` (`usu_id`, `usu_nome`, `usu_login`, `usu_senha`, `usu_status`, `usu_email`, `grp_id`, `usu_avatar`, `usu_perfil`, `usu_whatsapp`, `usu_cpf`, `usu_codigo`) VALUES
	(62, 'lindson', 'lindson', '123', 'A', 'lindsoncardoso.al@gmail.com', NULL, NULL, 'ADM', NULL, NULL, '1234'),
	(67, 'saraca skds kl', 'SARAH', '123', '', 'sarah@gmail.com', NULL, NULL, 'FUN', '233342342424234', NULL, '3451'),
	(85, 'teste', 'teste', '123', NULL, '1l@gmail.com', NULL, NULL, 'ADM', NULL, NULL, NULL),
	(86, 'sue', 'set', '123', NULL, '2123@gmail.com', NULL, NULL, 'ADM', NULL, NULL, NULL),
	(87, 'lucas', 'lucas', '123', NULL, 'lindso@gmail.com', NULL, NULL, 'ADM', NULL, NULL, NULL),
	(88, 'lkuiz', 'luiz', '123', NULL, 'lui@gnmail.com', NULL, NULL, 'ADM', NULL, NULL, NULL),
	(89, 'victor', 'victor', '123', NULL, 'oli@gmail.com', NULL, NULL, 'ADM', NULL, NULL, NULL),
	(90, 'dan', 'dan', '123', NULL, 'dan@gmail.com', NULL, NULL, 'ADM', NULL, NULL, NULL),
	(91, 'vif', 'cig', '123', NULL, '1@gmail.com', NULL, NULL, 'ADM', NULL, NULL, NULL),
	(92, '123', '123', '123', NULL, '123@gmail.com', NULL, NULL, 'ADM', NULL, NULL, NULL),
	(93, 'caint', 'caisne', '123', NULL, '123@mgail.com', NULL, NULL, 'ADM', NULL, NULL, NULL);
/*!40000 ALTER TABLE `cad_usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
