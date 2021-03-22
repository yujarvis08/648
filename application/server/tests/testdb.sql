-- MySQL Script generated by MySQL Workbench
-- Sun Mar 21 18:17:25 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema testdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `testdb` ;

-- -----------------------------------------------------
-- Schema testdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `testdb` DEFAULT CHARACTER SET utf8 ;
USE `testdb` ;

-- -----------------------------------------------------
-- Table `testdb`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`account` (
  `account(d` INT NOT NULL AUTO_INCREMENT,
  `userType` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`account(d`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`customer` (
  `customerId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `accountId` INT NULL,
  PRIMARY KEY (`customerId`),
  INDEX `customerAccountFK_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `customerAccountFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `testdb`.`account` (`account(d`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`restaurantOwner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`restaurantOwner` (
  `ownerId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `accountId` INT NULL,
  PRIMARY KEY (`ownerId`),
  INDEX `accountIdFk_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `ownerAccountIdFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `testdb`.`account` (`account(d`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`menu` (
  `menuId` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`menuId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`businessSchedule`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`businessSchedule` (
  `scheduleId` INT NOT NULL AUTO_INCREMENT,
  `day` VARCHAR(45) NULL,
  `openingHour` DATETIME NULL,
  `closingHour` DATETIME NULL,
  PRIMARY KEY (`scheduleId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`address` (
  `addressId` INT NOT NULL AUTO_INCREMENT,
  `line1` VARCHAR(45) NOT NULL,
  `line2` VARCHAR(45) NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `zipcode` INT(5) NOT NULL,
  PRIMARY KEY (`addressId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`restaurant` (
  `restaurantId` INT NOT NULL AUTO_INCREMENT,
  `ownerId` INT NOT NULL,
  `menuId` INT NULL,
  `businessScheduleId` INT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `cuisine` VARCHAR(45) NULL,
  `priceRating` TINYINT NULL,
  `address` INT NULL,
  INDEX `ownerIdFK_idx` (`ownerId` ASC) VISIBLE,
  PRIMARY KEY (`restaurantId`),
  INDEX `menuIdFk_idx` (`menuId` ASC) VISIBLE,
  INDEX `businessScheduleId_idx` (`businessScheduleId` ASC) VISIBLE,
  INDEX `restaurantAddressFK_idx` (`address` ASC) VISIBLE,
  CONSTRAINT `ownerIdFK`
    FOREIGN KEY (`ownerId`)
    REFERENCES `testdb`.`restaurantOwner` (`ownerId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `menuIdFk`
    FOREIGN KEY (`menuId`)
    REFERENCES `testdb`.`menu` (`menuId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `businessScheduleId`
    FOREIGN KEY (`businessScheduleId`)
    REFERENCES `testdb`.`businessSchedule` (`scheduleId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `restaurantAddressFK`
    FOREIGN KEY (`address`)
    REFERENCES `testdb`.`address` (`addressId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`deliveryDriver`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`deliveryDriver` (
  `driverId` INT NOT NULL AUTO_INCREMENT,
  `restaurantId` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `accountId` INT NULL,
  PRIMARY KEY (`driverId`),
  INDEX `restaurantIdFK_idx` (`restaurantId` ASC) VISIBLE,
  INDEX `driverAccountFK_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `driverRestaurantIdFK`
    FOREIGN KEY (`restaurantId`)
    REFERENCES `testdb`.`restaurant` (`restaurantId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `driverAccountFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `testdb`.`account` (`account(d`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`order` (
  `orderId` INT NOT NULL AUTO_INCREMENT,
  `restaurantId` INT NULL,
  PRIMARY KEY (`orderId`),
  INDEX `restaurantIdFK_idx` (`restaurantId` ASC) VISIBLE,
  CONSTRAINT `orderRestaurantIdFK`
    FOREIGN KEY (`restaurantId`)
    REFERENCES `testdb`.`restaurant` (`restaurantId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `testdb`.`menuItem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testdb`.`menuItem` (
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
    REFERENCES `testdb`.`menu` (`menuId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
