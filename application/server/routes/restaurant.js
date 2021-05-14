const express = require('express');
const router = express.Router();
const { getAllMenuItems } = require('../models/menuItem');

// api/restaurant/:restaurantId/getMenuItems
router.get('/:restaurantId/getMenuItems', async (req, res) => {
    let { restaurantId } = req.params;
    let result = await getAllMenuItems(restaurantId);
    res.status(200).json({ menuItems: result });
});

module.exports = router;
