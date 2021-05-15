const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

//Create order: POST /orders/submit
router.post('/submit', async (req, res) => {
    console.log('in order submit')
    let { cartItems, total } = req.body;
    console.log('cart items and total in submit order:', cartItems, total);
    let { account_id: accountId } = req.cookies;
    let key = Object.keys(cartItems)[0];
    let result = await Order.getRestaurantIdFromMenuItemId(cartItems[key].menuItemId);
    let restaurantId = result[0].restaurantId;
    // TODO: CREATE A MODEL FUNCTION WHERE WE CAN PASS ALL ORDERS AND INSERT THEM ALL INTO RESTAURANTORDERS
    await Order.insertOrder(accountId, restaurantId);
    res.status(200).json({ msg: 'created an order' });
});

//Get order: GET /orders/orderId takes in accountId
router.get('/getOrders', async (req, res) => {
    let { account_id: accountId } = req.cookies;
    let orders = await Order.getOrders(accountId);
    console.log('ORDERS IN ROUTE', orders);
    res.status(200).json({
        msg: 'got the orders',
        orders: orders
    });
});

//Update order comment PUT /orders/updateComment/:orderId
router.post('/updateComment', async (req, res) => {
    let { restaurantOrderId, comment } = req.body;
    await Order.updateComment(restaurantOrderId, comment);
    res.status(200).json({ msg: 'updated the order comment' });
});

//Cancel order (customer): DELETE /orders/cancelOrder/:orderId
router.post('/cancelOrder', async (req, res) => {
    let { restaurantOrderId } = req.body;
    await Order.cancelOrder(restaurantOrderId);
    res.status(200).json({ msg: 'Cancelled the order' });
});

// gets the order status
router.get('/orderStatus', async (req, res) => {
    let { restaurantOrderId } = req.body;
    await Order.orderStatus(restaurantOrderId);
    res.status(200).json({ msg: 'Retrieved the order status' });
});

// update the order status
router.put('/setOrderStatus', async (req, res) => {
    let { restaurantOrderId } = req.body;
    await Order.setOrderStatus(restaurantOrderId);
    res.status(200).json({ msg: 'Set the order status' });
});

module.exports = router;
