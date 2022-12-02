CREATE SCHEMA IF NOT EXISTS `recrutr-db` ;

CREATE TABLE IF NOT EXISTS `recrutr-db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `is_sso_user` TINYINT NULL,
  `role` ENUM('ADMIN', 'HR', 'INTERVIEWER') NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
