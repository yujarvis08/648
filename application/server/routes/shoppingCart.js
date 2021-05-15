const express = require('express');
const router = express.Router();
const shoppingCart = require('../models/shoppingCart');

router.get('/', async (req, res) => {
    let { account_id: accountId } = req.cookies;
    let result = await shoppingCart.getCartItems(accountId);
    let cart = {};
    let total = 0.00;
    result.forEach((menuItem) => {
        let name = menuItem.name;
        total += menuItem.price;
        if (cart[name]) {
            cart[name].quantity++;
            cart[name].total += menuItem.price;
        } else {
            cart[name] = {};
            cart[name].quantity = 1;
            cart[name].name = menuItem.name;
            cart[name].total = menuItem.price;
        }
    })
    cart.total = total;
    console.log('cart:', cart);
    res.status(200).json({ cart });
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
