-- 新建数据库

CREATE DATABASE 163music;

USE 163music;

SET FOREIGN_KEY_CHECKS=0;

-- 新建歌曲表

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `m_id` int(11) NOT NULL DEFAULT '0',
  `m_author` text NOT NULL,
  `m_name` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `m_url` varchar(100) NOT NULL DEFAULT '',
  `m_duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 新建用户表

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` text NOT NULL,
  `m_list` varchar(255) DEFAULT '',
  `u_age` tinyint(3) DEFAULT '0',
  `u_sex` tinyint(1) DEFAULT '0',
  `u_desc` text,
  `u_addr` text,
  PRIMARY KEY (`u_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 新建用户

CREATE USER madmin IDENTIFIED BY "163music";

GRANT All ON 163music.muser TO 'madmin'@'%';