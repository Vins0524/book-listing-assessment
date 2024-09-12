/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : book-management

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2024-09-12 13:09:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `books`
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `isbn` varchar(50) NOT NULL,
  `publishedDate` varchar(50) NOT NULL,
  `genre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES ('1', 'One Piece', ' Eiichiro Oda', '978-4-08-872631-1', '1996', 'Adventure');
INSERT INTO `books` VALUES ('2', 'Naruto', 'Masashi Kishimoto', '978-1-4215-1090-3', '1999', '	 Adventure');
INSERT INTO `books` VALUES ('3', 'Hunter × Hunter', 'Yoshihiro Togash', '978-1-59116-753-2', '2005', 'Adventure');
