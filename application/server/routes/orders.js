const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Address = require('../models/Address');
const Customer = require('../models/Customer');

//Create order: POST /orders/submit
router.post('/submit', async (req, res) => {
    let address = { line1, line2, city, state, zipcode, } = req.body;
    const order = { total, instructions, cartItems } = req.body;
    let accountId = req.cookies.account_id;
    // insert address and get the addressId back
    let result = await Address.insertAddress(address);
    order.addressId = result.insertId;
    // Use account ID from cookie to get customer ID
    let accResult = await Customer.getCustomerId(accountId);
    if (accResult) {
        order.customerId = accResult[0].customerId;
    } else {
        console.log('No customer with that accountId found');
        console.log('Perhaps it is a different type of User');
    }
    // get restaurantId from any menu item's menuId
    let key = Object.keys(cartItems)[0];
    result = await Order.getRestaurantIdFromMenuItemId(cartItems[key].menuItemId);
    order.restaurantId = result[0].restaurantId;
    // finally insert order
    await Order.insertOrder(order);
    res.status(200).json({ msg: 'created an order' });
});

//Get order: GET /orders/orderId takes in accountId
router.get('/getOrders', async (req, res) => {
    let { account_id: accountId } = req.cookies;
    let orders = await Order.getOrders(accountId);
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
router.put('/setStatus', async (req, res) => {
    console.log('in set status');
    let { orderId, orderStatus } = req.body;
    await Order.setStatus(orderId, orderStatus);
    res.status(200).json({ msg: `Set the order status to ${orderStatus}.` });
});

module.exports = router;
