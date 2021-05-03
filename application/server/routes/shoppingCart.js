const express          = require('express');
const router           = express.Router();
const shoppingCart     = require('../models/shoppingCart');

/* checkout */
router.post('/', async (req, res) => {
});

/* add item to shoppingCart */
router.post('/addItem', async (req, res) => {
    let { menuItemId } = req.body;
    // will get account id from cookie
    let { account_id: accountId } = req.cookies;

    await shoppingCart.addItem(accountId, menuItemId);
    res.status(200).json({ msg: 'inserted into shoppingCart' });
});

/* delete item from shoppingCard */
router.post('/deleteItem', async (req, res) => {
    let { shoppingCartId } = req.body;
    shoppingCart.deleteItem(shoppingCartId);
    res.status(200).json({ msg: 'deleted item from shopping cart' });
});

router.post('/checkout', async (req, res) => {
    let accountId = req.cookies.account_id;
    let { shoppingCartId, restaurantId } = req.body;
    shoppingCart.checkout(accountId, restaurantId);

});
module.exports = router;
