CREATE SCHEMA IF NOT EXISTS `recrutr-db` ;

CREATE TABLE IF NOT EXISTS `recrutr-db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `created_ts` DATETIME,
  `updated_ts` DATETIME,
  PRIMARY KEY (`id`));
