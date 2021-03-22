-- MySQL Script generated by MySQL Workbench
-- Mon Mar 22 12:43:56 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema team3db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `team3db` ;

-- -----------------------------------------------------
-- Schema team3db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `team3db` DEFAULT CHARACTER SET utf8 ;
USE `team3db` ;

-- -----------------------------------------------------
-- Table `team3db`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`account` (
  `accountId` INT NOT NULL AUTO_INCREMENT,
  `userType` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`accountId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`customer` (
  `customerId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `accountId` INT NULL,
  PRIMARY KEY (`customerId`),
  INDEX `customerAccountFK_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `customerAccountFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `team3db`.`account` (`accountId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`restaurantOwner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`restaurantOwner` (
  `ownerId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `accountId` INT NULL,
  PRIMARY KEY (`ownerId`),
  INDEX `accountIdFk_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `ownerAccountIdFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `team3db`.`account` (`accountId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`menu` (
  `menuId` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`menuId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`businessSchedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`businessSchedule` (
  `scheduleId` INT NOT NULL AUTO_INCREMENT,
  `day` VARCHAR(45) NULL,
  `openingHour` DATETIME NULL,
  `closingHour` DATETIME NULL,
  PRIMARY KEY (`scheduleId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`address` (
  `addressId` INT NOT NULL AUTO_INCREMENT,
  `line1` VARCHAR(45) NOT NULL,
  `line2` VARCHAR(45) NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `zipcode` INT(5) NOT NULL,
  PRIMARY KEY (`addressId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`restaurant` (
  `restaurantId` INT NOT NULL AUTO_INCREMENT,
  `ownerId` INT NOT NULL,
  `menuId` INT NULL,
  `businessScheduleId` INT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `cuisine` VARCHAR(45) NULL,
  `priceRating` TINYINT NULL,
  `addressId` INT NULL,
  INDEX `ownerIdFK_idx` (`ownerId` ASC) VISIBLE,
  PRIMARY KEY (`restaurantId`),
  INDEX `menuIdFk_idx` (`menuId` ASC) VISIBLE,
  INDEX `businessScheduleId_idx` (`businessScheduleId` ASC) VISIBLE,
  INDEX `restaurantAddressFK_idx` (`addressId` ASC) VISIBLE,
  CONSTRAINT `ownerIdFK`
    FOREIGN KEY (`ownerId`)
    REFERENCES `team3db`.`restaurantOwner` (`ownerId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `menuIdFk`
    FOREIGN KEY (`menuId`)
    REFERENCES `team3db`.`menu` (`menuId`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `businessScheduleId`
    FOREIGN KEY (`businessScheduleId`)
    REFERENCES `team3db`.`businessSchedule` (`scheduleId`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `restaurantAddressFK`
    FOREIGN KEY (`addressId`)
    REFERENCES `team3db`.`address` (`addressId`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`deliveryDriver`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`deliveryDriver` (
  `driverId` INT NOT NULL AUTO_INCREMENT,
  `restaurantId` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `accountId` INT NULL,
  PRIMARY KEY (`driverId`),
  INDEX `restaurantIdFK_idx` (`restaurantId` ASC) VISIBLE,
  INDEX `driverAccountFK_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `driverRestaurantIdFK`
    FOREIGN KEY (`restaurantId`)
    REFERENCES `team3db`.`restaurant` (`restaurantId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `driverAccountFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `team3db`.`account` (`accountId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`order` (
  `orderId` INT NOT NULL AUTO_INCREMENT,
  `restaurantId` INT NULL,
  PRIMARY KEY (`orderId`),
  INDEX `restaurantIdFK_idx` (`restaurantId` ASC) VISIBLE,
  CONSTRAINT `orderRestaurantIdFK`
    FOREIGN KEY (`restaurantId`)
    REFERENCES `team3db`.`restaurant` (`restaurantId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`menuItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`menuItem` (
  `menuItemId` INT NOT NULL AUTO_INCREMENT,
  `menuId` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `option` VARCHAR(45) NULL,
  `price` DECIMAL NULL,
  PRIMARY KEY (`menuItemId`),
  INDEX `menuId_idx` (`menuId` ASC) VISIBLE,
  CONSTRAINT `menuId`
    FOREIGN KEY (`menuId`)
    REFERENCES `team3db`.`menu` (`menuId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
