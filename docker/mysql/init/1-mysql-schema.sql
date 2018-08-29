USE `todoapp`;
CREATE TABLE `todoapp`.`tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `task` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`)
);
