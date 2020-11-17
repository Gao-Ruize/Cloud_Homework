/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : se

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2020-11-08 20:30:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `course_id` varchar(255) DEFAULT NULL,
  `course_info` varchar(255) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for homework
-- ----------------------------
DROP TABLE IF EXISTS `homework`;
CREATE TABLE `homework` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `release_time` datetime DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `course_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for homeworkanswer
-- ----------------------------
DROP TABLE IF EXISTS `homeworkanswer`;
CREATE TABLE `homeworkanswer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `homework_id` int(11) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `picture` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `release_time` datetime DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for studenthomework
-- ----------------------------
DROP TABLE IF EXISTS `studenthomework`;
CREATE TABLE `studenthomework` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commited_time` datetime DEFAULT NULL,
  `homework_id` int(11) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `picture` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL, 
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for instruct
-- ----------------------------
DROP TABLE IF EXISTS `instruct`;
CREATE TABLE `instruct` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;