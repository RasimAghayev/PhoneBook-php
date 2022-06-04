/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100607
 Source Host           : localhost:3306
 Source Schema         : phone_books

 Target Server Type    : MySQL
 Target Server Version : 100607
 File Encoding         : 65001

 Date: 05/06/2022 02:46:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for phone_books
-- ----------------------------
DROP TABLE IF EXISTS `phone_books`;
CREATE TABLE `phone_books`  (
  `id` int NOT NULL,
  `mod_no` int NULL DEFAULT NULL,
  `Gender` enum('M','W') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `SurName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `Address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Note` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `Photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_user_id` int NULL DEFAULT NULL,
  `created_date` datetime NULL DEFAULT NULL,
  `updated_user_id` int NULL DEFAULT NULL,
  `udpated_date` datetime NULL DEFAULT NULL,
  `deleted_user_id` int NULL DEFAULT NULL,
  `deleted_date` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `Email`(`Email` ASC) USING BTREE,
  FULLTEXT INDEX `NameSurname`(`Name`, `SurName`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = COMPRESSED;

-- ----------------------------
-- Records of phone_books
-- ----------------------------

-- ----------------------------
-- Table structure for phone_books_history
-- ----------------------------
DROP TABLE IF EXISTS `phone_books_history`;
CREATE TABLE `phone_books_history`  (
  `id` int NOT NULL,
  `pb_id` int NULL DEFAULT NULL,
  `mod_no` int NULL DEFAULT NULL,
  `column_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `old_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `new_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `pb_id_fk`(`pb_id` ASC) USING BTREE,
  CONSTRAINT `pb_id_fk` FOREIGN KEY (`pb_id`) REFERENCES `phone_books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of phone_books_history
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
