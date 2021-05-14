const express = require('express');
const router = express.Router();
const shoppingCart = require('../models/shoppingCart');

/* checkout */
router.post('/', async (req, res) => {
});

/* add item to shoppingCart */
router.post('/addItem', async (req, res) => {
    let { menuItemId } = req.body;
    let { account_id: accountId } = req.cookies;
    await shoppingCart.addItem(accountId, menuItemId);
    res.status(200).json({ msg: 'inserted into shoppingCart' });
});

/* delete item from shoppingCart */
router.delete('/deleteItem', async (req, res) => {
    let { account_id: accountId } = req.cookies;
    let { menuItemId } = req.body;
    await shoppingCart.deleteItem(accountId, menuItemId);
    res.status(200).json({ msg: 'deleted item from shopping cart' });
});

router.post('/checkout', async (req, res) => {
    let { account_id: accountId } = req.cookies;
    let { shoppingCartId, restaurantId } = req.body;
    shoppingCart.checkout(accountId, restaurantId);
    res.status(200).json({ msg: 'checkout' });
});
module.exports = router;
