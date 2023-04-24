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

CREATE TABLE IF NOT EXISTS `candidate_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `candidate_name` varchar(255) NOT NULL,
  `candidate_dob` datetime NOT NULL,
  `candidate_gender` enum('MALE','FEMALE','OTHER') NOT NULL,
  `candidate_education` varchar(255) NOT NULL,
  `candidate_resume` blob NOT NULL,
  `candidate_work_experience` float(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `candidate_info_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);