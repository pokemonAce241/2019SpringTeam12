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
  PRIMARY KEY (`id`),
  KEY `garden_fk_idx` (`garden_id`),
  KEY `instance_plant_fk_idx` (`plant_id`),
  CONSTRAINT `garden_fk` FOREIGN KEY (`garden_id`) REFERENCES `garden` (`id`),
  CONSTRAINT `instance_plant_fk` FOREIGN KEY (`plant_id`) REFERENCES `plant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant_instance`
--

LOCK TABLES `plant_instance` WRITE;
/*!40000 ALTER TABLE `plant_instance` DISABLE KEYS */;
INSERT INTO `plant_instance` VALUES (1,1,1,200,200),(20,1,4,347,338),(21,1,4,485,320),(22,1,8,101,329),(28,1,6,176,243),(32,2,6,323,255),(34,2,5,697,426),(35,2,5,727,385),(36,2,8,462,223),(37,2,2,436,191),(39,2,4,399,313),(40,2,3,432,425),(42,2,3,511,401),(44,1,3,696,396),(47,2,2,515,198),(48,7,6,220,194),(49,2,4,327,267),(53,6,1,282,299),(54,6,2,125,389),(55,7,1,361,178),(56,7,4,215,338),(58,8,3,418,236),(59,8,1,308,90),(60,8,4,306,233),(61,8,5,439,96),(62,7,8,273,98),(63,7,2,474,306),(64,7,8,295,255),(65,7,6,400,98),(66,7,4,150,159),(67,7,9,113,273),(69,2,6,246,193),(70,2,4,210,315),(71,9,8,348,231),(73,9,7,294,223),(74,9,9,298,10),(75,9,9,484,20),(76,6,4,295,267),(77,6,2,41,387),(78,9,3,599,227),(79,6,6,51,450),(80,7,9,693,263),(81,6,2,198,384),(82,6,2,-37,336),(83,6,8,285,432),(84,6,8,194,431),(85,10,2,179,103),(86,10,2,254,105),(87,10,3,32,364),(88,10,6,9,427),(89,10,6,88,406),(90,10,6,135,350),(91,10,3,90,273),(92,10,6,185,273),(93,10,8,318,403),(94,10,9,379,350),(95,10,4,371,417),(96,10,1,22,291),(97,10,4,323,456),(98,10,9,259,457),(99,10,5,94,315),(101,11,3,523,178),(103,2,4,55,279),(104,2,9,114,443),(105,2,6,566,49),(106,2,5,632,309),(109,2,2,170,110),(110,2,4,801,102),(111,12,8,90,179),(112,12,2,317,188),(113,2,1,60,93),(114,2,6,841,243),(115,2,6,988,244),(116,2,6,750,336),(117,2,6,806,383),(118,2,6,890,407),(119,2,6,979,391),(120,2,6,1067,355),(121,2,8,906,308),(122,2,6,425,17),(123,2,9,674,151),(124,2,5,320,87),(128,13,4,122,263),(129,13,9,56,411),(130,13,6,605,291),(132,13,1,481,244),(133,13,3,297,327),(134,13,1,151,90),(136,14,6,218,285),(137,15,1,241,228),(138,15,4,386,147),(139,14,6,105,287),(140,14,4,180,112);
/*!40000 ALTER TABLE `plant_instance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-10 10:42:44
