DROP TABLE IF EXISTS `boardgames`;
CREATE TABLE `boardgames` (
  `name` varchar(200) NOT NULL,
  `year` smallint NOT NULL,
  `rating` float DEFAULT NULL,
  `minPlayers` smallint DEFAULT NULL,
  `maxPlayers` smallint DEFAULT NULL,
  `minPlaytime` smallint DEFAULT NULL,
  `maxPlaytime` smallint DEFAULT NULL,
  `minAge` smallint DEFAULT NULL,
  `designers` varchar(200) DEFAULT NULL,
  `artists` varchar(200) DEFAULT NULL,
  `publishers` varchar(200) DEFAULT NULL,
  `id` mediumint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO `boardgames`
VALUES
  (
    'from database',
    2020,
    8.5,
    1,
    3,
    20,
    60,
    18,
    'designers',
    'artists',
    'publishers',
    123456
  );