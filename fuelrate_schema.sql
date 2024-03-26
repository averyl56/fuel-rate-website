CREATE DATABASE  IF NOT EXISTS "fuelrate" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fuelrate`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: fuelratedatabase-averysschoolprojects.a.aivencloud.com    Database: fuelrate
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '64a582a0-e6e8-11ee-a8cb-9ef3c5aabb92:1-82';

--
-- Table structure for table `ClientInformation`
--

DROP TABLE IF EXISTS `ClientInformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClientInformation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` char(2) NOT NULL,
  `zipcode` varchar(9) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userIdProfile_idx` (`userId`),
  CONSTRAINT `userIdProfile` FOREIGN KEY (`userId`) REFERENCES `UserCredentials` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientInformation`
--

LOCK TABLES `ClientInformation` WRITE;
/*!40000 ALTER TABLE `ClientInformation` DISABLE KEYS */;
INSERT INTO `ClientInformation` VALUES (6,1,'Avery Lindseth','1234 Main Street','','Houston','TX','77002');
/*!40000 ALTER TABLE `ClientInformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FuelQuote`
--

DROP TABLE IF EXISTS `FuelQuote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FuelQuote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `number` int NOT NULL,
  `gallonsRequested` int NOT NULL,
  `address` varchar(350) DEFAULT NULL,
  `deliveryDate` char(10) DEFAULT NULL,
  `suggestedPrice` double NOT NULL,
  `totalPrice` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userIdQuotes` FOREIGN KEY (`userId`) REFERENCES `UserCredentials` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FuelQuote`
--

LOCK TABLES `FuelQuote` WRITE;
/*!40000 ALTER TABLE `FuelQuote` DISABLE KEYS */;
INSERT INTO `FuelQuote` VALUES (10,1,1,100,'1234 Main Street  Houston, TX 77002','2024-03-28',1.73,172.5),(11,1,2,100,'1234 Main Street  Houston, TX 77002','2024-03-28',1.71,171),(12,1,3,100,'1234 Main Street  Houston, TX 77002','2024-03-28',1.71,171);
/*!40000 ALTER TABLE `FuelQuote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserCredentials`
--

DROP TABLE IF EXISTS `UserCredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserCredentials` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCredentials`
--

LOCK TABLES `UserCredentials` WRITE;
/*!40000 ALTER TABLE `UserCredentials` DISABLE KEYS */;
INSERT INTO `UserCredentials` VALUES (1,'avery','$2b$10$pCudhqMwHtFbymS0haCbxOg5UdaPG1dSB3f9FpRY7CpsUtitzLbaq'),(2,'johnny','$2b$10$XRf7hmGU4kINzc.uQTYyf.dd/lRwlhwlxvQjI3YPMzuqhSpMkgjFa'),(3,'fueltrackerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr','$2b$10$vVqi9eyUQXC1FlxCbI4P2ewCvAUM4qyQfMY3IIxJEg3zcH1ZjbAIe'),(4,'fueltracker','$2b$10$4p5IONiv2ni0Fe6y340/P.3ZXG6TUuw55AT6YN2ChaLZmpcyPwAhO'),(5,'fuelracker','$2b$10$ayvob08fIE1xDl8Kq.F/JuexFuBfOg/dK7fw20kUpclfOjARRJ1oG'),(6,'fultrackerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr','$2b$10$lbIRQMQfIsLXcNOhuDbAa.1ZeTDHI0.QJJQZPIUsFDLjUiDsz5B7e'),(7,'fuetracker','$2b$10$zYRh4QZBHU..FWDFNY10..SGBOLnaPCXYDjQGK2G5IehR5zJaNxnS'),(8,'fuelacker','$2b$10$403fzFYe.iG0s/sFOE3h7eoO0WEHpsr3r4cpaMMnU.fFyT4TQkgmq'),(9,'fueacker','$2b$10$SoeZJkvHx6pd.YoO01Ng7.g6ojX7d0RxoJwVay2euYHeRKomis/9y'),(10,'fultrckerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr','$2b$10$8hkwMD90jZ3k4Ll2B.Dm6eFdAc.Sde3skMxSCSe4yHCcd7E52Y98u'),(11,'fuetcker','$2b$10$cBfSJH0W4W86wOegS/fhWe3Z7wJtuVnVlZm3gRUQLfzwmFEd4h1R.'),(12,'test1','$2b$10$upKXSQoezjWL8eufC4DbJ.vb6J4RGhnqvza.QsQ1I5pgNuwKe70s2');
/*!40000 ALTER TABLE `UserCredentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'fuelrate'
--

--
-- Dumping routines for database 'fuelrate'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-26 16:40:13