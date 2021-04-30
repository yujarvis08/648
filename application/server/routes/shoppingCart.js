const express          = require('express');
const router           = express.Router();
const shoppingCart     = require('../models/shoppingCart');

/* checkout */
router.post('/', async (req, res) => {
});

/* add item to shoppingCart */
router.post('/addItem', async (req, res) => {
    let { accountId, menuItemId } = req.body;

    await shoppingCart.addItem(accountId, menuItemId);
    res.status(200).json({ msg: 'inserted into shoppingCart' });
});

module.exports = router;
