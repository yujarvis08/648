-- MySQL Script generated by MySQL Workbench
-- Fri Apr  9 16:32:04 2021
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
-- Table `team3db`.`cuisine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`cuisine` (
  `cuisineId` INT NOT NULL AUTO_INCREMENT,
  `cuisineType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cuisineId`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `team3db`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`account` (
  `accountId` INT NOT NULL AUTO_INCREMENT,
  `userType` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`accountId`, `email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`customer` (
  `customerId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `accountId` INT NOT NULL,
  PRIMARY KEY (`customerId`),
  INDEX `customerAccountFK_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `customerAccountFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `team3db`.`account` (`accountId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`restaurantOwner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`restaurantOwner` (
  `ownerId` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `accountId` INT NOT NULL,
  PRIMARY KEY (`ownerId`),
  INDEX `accountIdFk_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `ownerAccountIdFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `team3db`.`account` (`accountId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
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
  `businessScheduleId` INT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  `cuisine` VARCHAR(45) NULL,
  `priceRating` VARCHAR(3) NULL,
  `addressId` INT NULL,
  `imagePath` VARCHAR(45) NULL,
  INDEX `ownerIdFK_idx` (`ownerId` ASC) VISIBLE,
  PRIMARY KEY (`restaurantId`),
  INDEX `businessScheduleId_idx` (`businessScheduleId` ASC) VISIBLE,
  INDEX `restaurantAddressFK_idx` (`addressId` ASC) VISIBLE,
  CONSTRAINT `ownerIdFK`
    FOREIGN KEY (`ownerId`)
    REFERENCES `team3db`.`restaurantOwner` (`ownerId`)
    ON DELETE CASCADE
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
  `accountId` INT NOT NULL,
  PRIMARY KEY (`driverId`),
  INDEX `restaurantIdFK_idx` (`restaurantId` ASC) VISIBLE,
  INDEX `driverAccountFK_idx` (`accountId` ASC) VISIBLE,
  CONSTRAINT `driverRestaurantIdFK`
    FOREIGN KEY (`restaurantId`)
    REFERENCES `team3db`.`restaurant` (`restaurantId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `driverAccountFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `team3db`.`account` (`accountId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`restaurantOrder`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`restaurantOrder` (
  `orderId` INT NOT NULL AUTO_INCREMENT,
  `comment` VARCHAR(45),
  `orderStatus` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `restaurantId` INT NULL,
  `customerId` INT NULL,
  PRIMARY KEY (`orderId`),
  INDEX `restaurantIdFK_idx` (`restaurantId` ASC) VISIBLE,
  CONSTRAINT `orderRestaurantIdFK`
    FOREIGN KEY (`restaurantId`)
    REFERENCES `team3db`.`restaurant` (`restaurantId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `order_customer_FK`
    FOREIGN KEY (`customerId`)
    REFERENCES `team3db`.`customer` (`customerId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)

ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `team3db`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`menu` (
  `menuId` INT NOT NULL AUTO_INCREMENT,
  `restaurantId` INT NOT NULL,
  PRIMARY KEY (`menuId`),
  INDEX `menuRestaurantFK_idx` (`restaurantId` ASC) VISIBLE,
  UNIQUE INDEX `restaurantId_UNIQUE` (`restaurantId` ASC) VISIBLE,
  UNIQUE INDEX `menuId_UNIQUE` (`menuId` ASC) VISIBLE,
  CONSTRAINT `menuRestaurantFK`
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
  `description` VARCHAR(255) NULL,
  `option` VARCHAR(45) NULL,
  `price` DECIMAL(5,2) NULL,
  PRIMARY KEY (`menuItemId`),
  INDEX `menuId_idx` (`menuId` ASC) VISIBLE,
  CONSTRAINT `menuId`
    FOREIGN KEY (`menuId`)
    REFERENCES `team3db`.`menu` (`menuId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `team3db`.`shoppingCart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `team3db`.`shoppingCart` (
  `shoppingCartId` INT NOT NULL AUTO_INCREMENT,
  `accountId` INT NOT NULL,
  `menuItemId` INT NOT NULL,
  PRIMARY KEY (`shoppingCartId`),
  CONSTRAINT `shoppingCartAccountFK`
    FOREIGN KEY (`accountId`)
    REFERENCES `team3db`.`account` (`accountId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `menuItemShoppingCartFK`
    FOREIGN KEY (`menuItemId`)
    REFERENCES `team3db`.`menuItem` (`menuItemId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
