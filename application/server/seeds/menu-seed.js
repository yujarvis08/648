const menuModel = require('../models/Menu')
const menuItemModel = require('../models/MenuItem');
const accountModel = require('../models/Account');
const restaurantModel = require('../models/Restaurant')
const db = require('../db');

// get a restaurantId
const restaurantId = restaurantModel.getAll()[0].restaurantId;
// create an empty menu
menuModel.insertMenu(restaurantId);
// link the menu to a restaurant
// iterate through a list of menu items, inserting them into the menu