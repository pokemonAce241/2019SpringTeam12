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
  `type_id` int(11) NOT NULL,
  `native` tinyint(4) NOT NULL,
  `min_hardiness` int(11) NOT NULL,
  `max_hardiness` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `front_image_path` varchar(255) DEFAULT NULL,
  `side_image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plant_type_fk_idx` (`type_id`),
  KEY `color_fk_idx` (`color_id`),
  CONSTRAINT `color_fk` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`),
  CONSTRAINT `plant_type_fk` FOREIGN KEY (`type_id`) REFERENCES `plant_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant`
--

LOCK TABLES `plant` WRITE;
/*!40000 ALTER TABLE `plant` DISABLE KEYS */;
INSERT INTO `plant` VALUES (1,'Golden Alexander','Zizia','aurea',2,3,1,3,1,1,3,8,5,'assets/images/zizia-aurea.png','assets/images/zizia-aurea.png'),(2,'Carolina jessamine','Gelsemium','sempervirens',12,20,3,6,3,1,7,10,5,'assets/images/gelsemium-sempervirens.png','assets/images/gelsemium-sempervirens.png'),(3,'Rabbiteye blueberry','Vaccinium','ashei',3,12,4,5,4,1,6,9,6,'assets/images/vaccinium-ashei-spring.png','assets/images/vaccinium-ashei-spring.png'),(4,'Cosmos','Cosmos','bipinnatus',1,4,2,3,2,0,2,11,4,'assets/images/cosmos-bipinnatus.png','assets/images/cosmos-bipinnatus.png'),(5,'Rattlesnake master','Eryngium','yuccifolium',4,5,2,3,1,1,3,8,6,'assets/images/eryngium-yuccifolium.png','assets/images/eryngium-yuccifolium.png'),(6,'Butterfly weed','Asclepias','tuberosa',1,3,1,2,1,1,3,9,7,'assets/images/asclepias-tuberosa.png','assets/images/asclepias-tuberosa.png'),(7,'Rough goldenrod','Solidago','rugosa \'fireworks\'',3,4,3,4,1,1,4,8,5,'assets/images/solidago-rugosa.png','assets/images/solidago-rugosa.png'),(8,'Aromatic aster','Symphiotrichum','oblongifolium',1,3,1,3,1,1,3,8,3,'assets/images/symphiotrichum-oblongifolium.png','assets/images/symphiotrichum-oblongifolium.png'),(9,'Joe-pye weed','Eutrochium','dubium',3,4,1,3,1,1,3,9,4,'assets/images/eutrochium-dubium.png','assets/images/eutrochium-dubium.png');
/*!40000 ALTER TABLE `plant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-10 10:42:36
