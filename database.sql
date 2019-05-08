-- 新建数据库

CREATE DATABASE 163music;

USE 163music;

SET FOREIGN_KEY_CHECKS=0;

-- 新建歌曲表

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_name` text NOT NULL,
  `m_author` text,
  `m_url` varchar(255) NOT NULL,
  `m_duration` tinyint(3) DEFAULT NULL,
  `m_album` text,
  `list_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- 新建歌单表

DROP TABLE IF EXISTS `lists`;
CREATE TABLE `lists` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `list_name` text NOT NULL,
  `u_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`list_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- 新建用户表

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `u_id` int(8) unsigned NOT NULL AUTO_INCREMENT,
  `u_name` text NOT NULL,
  `u_pwd` varchar(20) CHARACTER SET gb2312 NOT NULL,
  `u_list` varchar(255) DEFAULT '',
  `u_age` tinyint(3) DEFAULT '0',
  `u_sex` tinyint(1) DEFAULT '0',
  `u_desc` text,
  `u_addr` text,
  PRIMARY KEY (`u_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
-- 测试数据
INSERT INTO `songs` VALUES ('1', '红色高跟鞋', '蔡雅健', 'http://m10.music.126.net/20190508193851/e426587a72411f6110dcdc9be416e2d0/ymusic/a391/279d/1655/ebc8f929b98e7b29f9e5adc0a31df24f.mp3', null, null, '1');
INSERT INTO `songs` VALUES ('2', '浪漫血液', '林俊杰', 'http://m10.music.126.net/20190508195611/f74fddc1625ff1809eb98bac88e7e46b/ymusic/ac51/0aed/7427/c45449babd56467fa3738bacfb3b215f.mp3', null, null, '1');
INSERT INTO `lists` VALUES ('1', '1', '1');
INSERT INTO `lists` VALUES ('2', '2333', '1');
INSERT INTO `lists` VALUES ('3', 'Love', '1');
INSERT INTO `lists` VALUES ('4', 'Love', '1');
INSERT INTO `lists` VALUES ('5', 'Love', '1');
INSERT INTO `lists` VALUES ('6', 'Love', '1');
INSERT INTO `lists` VALUES ('7', 'Love', '1');
INSERT INTO `lists` VALUES ('8', 'Love', '1');
INSERT INTO `lists` VALUES ('9', 'Love', '1');
INSERT INTO `lists` VALUES ('10', 'Love', '1');
INSERT INTO `lists` VALUES ('11', 'Love', '1');
INSERT INTO `lists` VALUES ('12', 'Love', '1');
INSERT INTO `users` VALUES ('1', 'failte', '123456', '', '0', '0', null, null);
INSERT INTO `users` VALUES ('2', 'tom', '123456', '', '0', '0', null, null);
INSERT INTO `users` VALUES ('3', 'tom', '123456', '', '0', '0', null, null);
INSERT INTO `users` VALUES ('4', '1', '', '', '0', '0', null, null);
INSERT INTO `users` VALUES ('5', '3', '', '', '0', '0', null, null);
INSERT INTO `users` VALUES ('6', '3', '', '', '0', '0', null, null);
INSERT INTO `users` VALUES ('7', 'tom', '123456', '', '0', '0', null, null);
INSERT INTO `users` VALUES ('8', '大哥', '125214', '', '0', '0', null, null);

-- 新建用户

CREATE USER madmin IDENTIFIED BY "163music";

GRANT All ON 163music.songs TO 'madmin'@'%';
GRANT All ON 163music.lists TO 'madmin'@'%';
GRANT All ON 163music.users TO 'madmin'@'%';