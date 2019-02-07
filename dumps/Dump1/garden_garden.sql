-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: garden
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `garden`
--

DROP TABLE IF EXISTS `garden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `garden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_fk_idx` (`user_id`),
  CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garden`
--

LOCK TABLES `garden` WRITE;
/*!40000 ALTER TABLE `garden` DISABLE KEYS */;
INSERT INTO `garden` VALUES (1,'test',1,'2018-10-29 15:19:00','2018-10-29 15:19:00'),(2,'kevin',1,'2018-12-07 15:57:30','2018-12-07 15:57:30'),(6,'Fall garden',1,'2018-12-07 16:04:30','2018-12-07 16:04:30'),(7,'First Garden',1,'2018-12-07 16:06:55','2018-12-07 16:06:55'),(8,'Derek\'s Garden',1,'2018-12-08 00:01:32','2018-12-08 00:01:32'),(9,'stev3',1,'2018-12-08 00:15:08','2018-12-08 00:15:08'),(10,'anya',1,'2018-12-08 00:27:28','2018-12-08 00:27:28'),(11,'Tammy is AWESOME',1,'2018-12-08 00:31:43','2018-12-08 00:31:43'),(12,'TEST',1,'2018-12-08 00:48:37','2018-12-08 00:48:37'),(13,'matt is cool',1,'2018-12-08 01:07:09','2018-12-08 01:07:09'),(14,'<script>alert(\"hello\");</script>',1,'2018-12-08 01:13:44','2018-12-08 01:13:44'),(15,'testing garden',1,'2018-12-08 01:15:02','2018-12-08 01:15:02'),(16,'kevin',1,'2018-12-09 21:16:42','2018-12-09 21:16:42');
/*!40000 ALTER TABLE `garden` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-10 10:42:37
