CREATE DATABASE  IF NOT EXISTS `garden` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `garden`;
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
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `color` (
  `plant_id` int(11) PRIMARY KEY NOT NULL,
  `red` BOOLEAN NOT NULL,
  `blue` BOOLEAN NOT NULL,
  `purple` BOOLEAN NOT NULL,
  `pink` BOOLEAN NOT NULL,
  `yellow` BOOLEAN NOT NULL,
  `white` BOOLEAN NOT NULL,
  `orange` BOOLEAN NOT NULL,
  `green` BOOLEAN NOT NULL,
  `other` BOOLEAN NOT NULL,
  FOREIGN KEY(`plant_id`) REFERENCES `plant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1, false, false, false, false, true, false, false, false, false), (2, false, false, false, false, true, false, false, false, false), (3, false, false, false, false, false, true, false, false, false), (4, false, false, false, true, false, false, false, false, false), (5, false, false, false, false, false, true, false, false, false), (6, false, false, false, false, false, false, true, false, false), (7, false, false, false, false, true, false, false, false, false), (8, false, false, true, false, false, false, false, false, false), (9, false, false, false, true, false, false, false, false, false);
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `garden`
--

LOCK TABLES `garden` WRITE;
/*!40000 ALTER TABLE `garden` DISABLE KEYS */;
INSERT INTO `garden` VALUES (1,'test',1,'2018-10-29 15:19:00','2018-10-29 15:19:00'),(2,'kevin',1,'2018-12-07 15:57:30','2018-12-07 15:57:30'),(6,'Fall garden',1,'2018-12-07 16:04:30','2018-12-07 16:04:30'),(7,'First Garden',1,'2018-12-07 16:06:55','2018-12-07 16:06:55'),(8,'Derek\'s Garden',1,'2018-12-08 00:01:32','2018-12-08 00:01:32'),(9,'stev3',1,'2018-12-08 00:15:08','2018-12-08 00:15:08'),(10,'anya',1,'2018-12-08 00:27:28','2018-12-08 00:27:28'),(11,'Tammy is AWESOME',1,'2018-12-08 00:31:43','2018-12-08 00:31:43'),(12,'TEST',1,'2018-12-08 00:48:37','2018-12-08 00:48:37'),(13,'matt is cool',1,'2018-12-08 01:07:09','2018-12-08 01:07:09'),(14,'<script>alert(\"hello\");</script>',1,'2018-12-08 01:13:44','2018-12-08 01:13:44'),(15,'testing garden',1,'2018-12-08 01:15:02','2018-12-08 01:15:02'),(16,'kevin',1,'2018-12-09 21:16:42','2018-12-09 21:16:42');
/*!40000 ALTER TABLE `garden` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `plant`
--

DROP TABLE IF EXISTS `plant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `plant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `common_name` varchar(45) NOT NULL,
  `genus` varchar(45) NOT NULL,
  `species` varchar(45) NOT NULL,
  `min_height` int(11) NOT NULL,
  `max_height` int(11) NOT NULL,
  `min_spread` int(11) NOT NULL,
  `max_spread` int(11) NOT NULL,
  `plant_type` varchar(45) NOT NULL,
  `native` tinyint(4) NOT NULL,
  `min_hardiness` int(11) NOT NULL,
  `max_hardiness` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `front_image_path` varchar(255) DEFAULT NULL,
  `side_image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant`
--
LOCK TABLES `plant` WRITE;
/*!40000 ALTER TABLE `plant` DISABLE KEYS */;
INSERT INTO `plant` VALUES (1,'Golden Alexander','Zizia','aurea',2,3,1,3,1,1,3,8,5,'assets/images/Yellow_Flower_Top.png','assets/images/zizia-aurea.png'),(2,'Carolina jessamine','Gelsemium','sempervirens',12,20,3,6,3,1,7,10,5,'assets/images/Yellow_Flower_Top.png','assets/images/gelsemium-sempervirens.png'),(3,'Rabbiteye blueberry','Vaccinium','ashei',3,12,4,5,4,1,6,9,6,'assets/images/Blue_Flower_Top.png','assets/images/vaccinium-ashei-spring.png'),(4,'Cosmos','Cosmos','bipinnatus',1,4,2,3,2,0,2,11,4,'assets/images/Pink_Flower_Top.png','assets/images/cosmos-bipinnatus.png'),(5,'Rattlesnake master','Eryngium','yuccifolium',4,5,2,3,1,1,3,8,6,'assets/images/White_Flower_Top.png','assets/images/eryngium-yuccifolium.png'),(6,'Butterfly weed','Asclepias','tuberosa',1,3,1,2,1,1,3,9,7,'assets/images/Orange_Flower_Top.png','assets/images/asclepias-tuberosa.png'),(7,'Rough goldenrod','Solidago','rugosa \'fireworks\'',3,4,3,4,1,1,4,8,5,'assets/images/Yellow_Flower_Top.png','assets/images/solidago-rugosa.png'),(8,'Aromatic aster','Symphiotrichum','oblongifolium',1,3,1,3,1,1,3,8,3,'assets/images/Purple_Flower_Top.png','assets/images/symphiotrichum-oblongifolium.png'),(9,'Joe-pye weed','Eutrochium','dubium',3,4,1,3,1,1,3,9,4,'assets/images/Pink_Flower_Top.png','assets/images/eutrochium-dubium.png');
/*!40000 ALTER TABLE `plant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_instance`
--

DROP TABLE IF EXISTS `plant_instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `plant_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `garden_id` int(11) NOT NULL,
  `plant_id` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  'collision' BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  KEY `garden_fk_idx` (`garden_id`),
  KEY `instance_plant_fk_idx` (`plant_id`),
  CONSTRAINT `garden_fk` FOREIGN KEY (`garden_id`) REFERENCES `garden` (`id`),
  CONSTRAINT `instance_plant_fk` FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_instance`
--

LOCK TABLES `plant_instance` WRITE;
/*!40000 ALTER TABLE `plant_instance` DISABLE KEYS */;
INSERT INTO `plant_instance` VALUES (1,1,1,200,200, false),(20,1,4,347,338,false),(21,1,4,485,320,false),(22,1,8,101,329,false),(28,1,6,176,243,false),(32,2,6,323,255,false),(34,2,5,697,426,false),(35,2,5,727,385,false),(36,2,8,462,223,false),(37,2,2,436,191,false),(39,2,4,399,313,false),(40,2,3,432,425,false),(42,2,3,511,401,false),(44,1,3,696,396,false),(47,2,2,515,198,false),(48,7,6,220,194,false),(49,2,4,327,267,false),(53,6,1,282,299,false),(54,6,2,125,389,false),(55,7,1,361,178,false),(56,7,4,215,338,false),(58,8,3,418,236,false),(59,8,1,308,90,false),(60,8,4,306,233,false),(61,8,5,439,96,false),(62,7,8,273,98,false),(63,7,2,474,306,false),(64,7,8,295,255,false),(65,7,6,400,98,false),(66,7,4,150,159,false),(67,7,9,113,273,false),(69,2,6,246,193,false),(70,2,4,210,315,false),(71,9,8,348,231,false),(73,9,7,294,223,false),(74,9,9,298,10,false),(75,9,9,484,20,false),(76,6,4,295,267,false),(77,6,2,41,387,false),(78,9,3,599,227,false),(79,6,6,51,450,false),(80,7,9,693,263,false),(81,6,2,198,384,false),(82,6,2,-37,336,false),(83,6,8,285,432,false),(84,6,8,194,431,false),(85,10,2,179,103,false),(86,10,2,254,105,false),(87,10,3,32,364,false),(88,10,6,9,427,false),(89,10,6,88,406,false),(90,10,6,135,350,false),(91,10,3,90,273,false),(92,10,6,185,273,false),(93,10,8,318,403,false),(94,10,9,379,350,false),(95,10,4,371,417,false),(96,10,1,22,291,false),(97,10,4,323,456,false),(98,10,9,259,457,false),(99,10,5,94,315,false),(101,11,3,523,178,false),(103,2,4,55,279,false),(104,2,9,114,443,false),(105,2,6,566,49,false),(106,2,5,632,309,false),(109,2,2,170,110,false),(110,2,4,801,102,false),(111,12,8,90,179,false),(112,12,2,317,188,false),(113,2,1,60,93,false),(114,2,6,841,243,false),(115,2,6,988,244,false),(116,2,6,750,336,false),(117,2,6,806,383,false),(118,2,6,890,407,false),(119,2,6,979,391,false),(120,2,6,1067,355,false),(121,2,8,906,308,false),(122,2,6,425,17,false),(123,2,9,674,151,false),(124,2,5,320,87,false),(128,13,4,122,263,false),(129,13,9,56,411,false),(130,13,6,605,291,false),(132,13,1,481,244,false),(133,13,3,297,327,false),(134,13,1,151,90,false),(136,14,6,218,285,false),(137,15,1,241,228,false),(138,15,4,386,147,false),(139,14,6,105,287,false),(140,14,4,180,112,false);
/*!40000 ALTER TABLE `plant_instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant_region_xref`
--

DROP TABLE IF EXISTS `regions`;
SET character_set_client = utf8mb4 ;
CREATE TABLE `regions` (
 `plant_id` int(11) PRIMARY KEY NOT NULL,
 `mountain` BOOLEAN NOT NULL,
 `piedmont` BOOLEAN NOT NULL,
 `coast` BOOLEAN NOT NULL,
 FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,true,true,false),(2,false,true,true),(3,true,true, true),(4,true,true, true),(5,false,true, true),(6,true,true, true),(7,true,true,true),(8,true,true, false),(9,true,true,false);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;




DROP TABLE IF EXISTS `soil`;
SET character_set_client = utf8mb4 ;
CREATE TABLE `soil` (
 `plant_id` int(11) PRIMARY KEY NOT NULL,
 `wet` BOOLEAN NOT NULL,
 `moist` BOOLEAN NOT NULL,
 `dry` BOOLEAN NOT NULL,
 FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `soil` WRITE;
INSERT INTO `soil` VALUES (1,false,true,false),(2,false,true,false),(3,false,true, true),(4,false,true, false),(5,false,true, true),(6,false,true, true),(7,false,true,false),(8,false,true, true),(9,true,true,false);
UNLOCK TABLES;

-- DROP TABLE IF EXISTS `plant_region_xref`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
--  SET character_set_client = utf8mb4 ;
-- CREATE TABLE `plant_region_xref` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `plant_id` int(11) NOT NULL,
--   `region_id` int(11) NOT NULL,
--   PRIMARY KEY (`id`),
--   KEY `plant_region_fk_idx` (`plant_id`),
--   KEY `region_fk_idx` (`region_id`),
--   CONSTRAINT `plant_region_fk` FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`),
--   CONSTRAINT `region_fk` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;
--
-- --
-- -- Table structure for table `plant_soil_xref`
-- --
--
-- DROP TABLE IF EXISTS `plant_soil_xref`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
--  SET character_set_client = utf8mb4 ;
-- CREATE TABLE `plant_soil_xref` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `plant_id` int(11) NOT NULL,
--   `soil_type_id` int(11) NOT NULL,
--   PRIMARY KEY (`id`),
--   KEY `plant_soil_fk_idx` (`plant_id`),
--   KEY `soil_fk_idx` (`soil_type_id`),
--   CONSTRAINT `plant_soil_fk` FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`),
--   CONSTRAINT `soil_fk` FOREIGN KEY (`soil_type_id`) REFERENCES `soil_type` (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;
--
-- --
-- -- Dumping data for table `plant_soil_xref`
-- --
--
-- LOCK TABLES `plant_soil_xref` WRITE;
-- /*!40000 ALTER TABLE `plant_soil_xref` DISABLE KEYS */;
-- INSERT INTO `plant_soil_xref` VALUES (1,1,2),(2,2,2),(3,3,2),(4,3,3),(5,4,2),(6,5,2),(7,5,3),(8,6,2),(9,6,3),(10,7,2),(11,8,2),(12,8,3),(13,9,1),(14,9,2);
-- /*!40000 ALTER TABLE `plant_soil_xref` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `plant_type`
--
--
-- DROP TABLE IF EXISTS `plant_type`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
--  SET character_set_client = utf8mb4 ;
-- CREATE TABLE `plant_type` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `name` varchar(45) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;
--
-- --
-- -- Dumping data for table `plant_type`
-- --
--
-- LOCK TABLES `plant_type` WRITE;
-- /*!40000 ALTER TABLE `plant_type` DISABLE KEYS */;
-- INSERT INTO `plant_type` VALUES (1,'perennial'),(2,'annual'),(3,'vine'),(4,'shrub');
-- /*!40000 ALTER TABLE `plant_type` ENABLE KEYS */;
-- UNLOCK TABLES;
--
-- --
-- Table structure for table `region`
--

-- DROP TABLE IF EXISTS `region`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
--  SET character_set_client = utf8mb4 ;
-- CREATE TABLE `region` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `name` varchar(45) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;
--
-- --
-- -- Dumping data for table `region`
-- --
--
-- LOCK TABLES `region` WRITE;
-- /*!40000 ALTER TABLE `region` DISABLE KEYS */;
-- INSERT INTO `region` VALUES (1,'mountain'),(2,'piedmont'),(3,'coast');
-- /*!40000 ALTER TABLE `region` ENABLE KEYS */;
-- UNLOCK TABLES;

--
-- Table structure for table `soil_type`
--
--
-- DROP TABLE IF EXISTS `soil_type`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
--  SET character_set_client = utf8mb4 ;
-- CREATE TABLE `soil_type` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `name` varchar(45) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soil_type`
--
--
-- LOCK TABLES `soil_type` WRITE;
-- /*!40000 ALTER TABLE `soil_type` DISABLE KEYS */;
-- INSERT INTO `soil_type` VALUES (1,'wet'),(2,'moist'),(3,'dry');
-- /*!40000 ALTER TABLE `soil_type` ENABLE KEYS */;
-- UNLOCK TABLES;


--
-- Table structure for the seasons table
--
DROP TABLE IF EXISTS `seasons`;
  SET character_set_client = utf8mb4;
CREATE TABLE `seasons` (
  `plant_id` int(11) PRIMARY KEY NOT NULL,
  `espring` BOOLEAN NOT NULL,
  `lspring` BOOLEAN NOT NULL,
  `esummer` BOOLEAN NOT NULL,
  `lsummer` BOOLEAN NOT NULL,
  `efall` BOOLEAN NOT NULL,
  `lfall` BOOLEAN NOT NULL,
  `winter` BOOLEAN NOT NULL,
  FOREIGN KEY(`plant_id`) REFERENCES `plant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `seasons` WRITE;
INSERT INTO `seasons` VALUES (1,false, true, false, false, false, false, false),(2, true, true, false, false, false, false, false),(3, false, true, false, false, false, false, false),(4, false, false, true, true, true, true, false),(5, false, false, true, true, true, false, false),(6, false, false, true, true, false, false, false),(7, false, false, false, false, true, false, false),(8,false, false, false, false, true, false, false),(9,false, false, false, true, true, false, false);
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `hash_pass` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'kabartus@ncsu.edu','asdfasdf');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-10 10:51:32
