const express = require('express');
const router = express.Router();
const { getAllMenuItems, insertMenuItem, removeMenuItem } = require('../models/menuItem');
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');


// api/restaurant/:restaurantId/getMenuItems
router.get('/:restaurantId/getMenuItems', async (req, res) => {
    let { restaurantId } = req.params;
    let result = await getAllMenuItems(restaurantId);
    res.status(200).json({ menuItems: result });
});

router.get('/menuItems', async (req, res) => {
    let accountId = req.cookies.account_id;
    let result = await Restaurant.getOwnerRestaurantId(accountId);
    let restaurantId = result[0].restaurantId;
    result = await getAllMenuItems(restaurantId);
    res.status(200).json({menuItems: result});
});

// api/restaurant/addMenuItem
router.post('/addMenuItem', async (req, res) => {
    let menuItem = { name, description, price } = req.body;
    let accountId = req.cookies.account_id;
    let result = await Restaurant.getOwnerRestaurantId(accountId);
    let restaurantId = result[0].restaurantId;
    // get menuId from accountId
    result = await Menu.getMenuIdFromRestaurantId(restaurantId);
    let menuId = result[0].menuId;

    await insertMenuItem(menuId, menuItem);
    res.status(200).json({ msg: 'Inserted menu item' });
});

// api/restaurant/removeMenuItem
router.delete('/removeMenuItem/:menuItemId', async (req, res) => {
    let { menuItemId } = req.params;
    console.log('menuItemId:', menuItemId);
    console.log('body:', req.params);
    await removeMenuItem(menuItemId);
    res.status(200).json({ msg: 'Inserted menu item' });
});

module.exports = router;
