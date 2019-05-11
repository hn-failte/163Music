-- 新建数据库

CREATE DATABASE 163music;

USE 163music;

SET FOREIGN_KEY_CHECKS=0;

-- 新建歌曲表

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `m_id` int(11) NOT NULL,
  `m_name` text NOT NULL,
  `m_author` text,
  `list_id` int(11) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=208903 DEFAULT CHARSET=utf8;

-- 新建歌单表

DROP TABLE IF EXISTS `lists`;
CREATE TABLE `lists` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `list_name` text NOT NULL,
  `u_name` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`list_id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- 新建用户表

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(11) NOT NULL,
  `u_pwd` varchar(20) CHARACTER SET gb2312 NOT NULL,
  `u_list` varchar(255) DEFAULT '',
  `u_age` tinyint(3) DEFAULT '0',
  `u_sex` tinyint(1) DEFAULT '0',
  `u_desc` text,
  `u_addr` text,
  PRIMARY KEY (`u_id`,`u_name`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- 新建用户

CREATE USER madmin IDENTIFIED BY "163music";

GRANT All ON 163music.songs TO 'madmin'@'%';
GRANT All ON 163music.lists TO 'madmin'@'%';
GRANT All ON 163music.users TO 'madmin'@'%';