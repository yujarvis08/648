const express = require('express');
const router = express.Router();

// TODO: Await-Async

const {
    insertOrder,
    getOrders,
    updateComment,
    cancelOrder,
    orderStatus
} = require('../models/Order');

//Create order: POST /order/create
router.post('/create', (req, res) => {
    let { restaurantId } = req.body;
    insertOrder(restaurantId);
    res.status(200).json({ msg: 'created an order' });
});

//Get order: GET /order/orderId takes in accountId
router.get('/getOrders', async (req, res) => {
    let { account_id: accountId } = req.cookies;
    let orders = await getOrders(accountId);
    console.log('ORDERS IN ROUTE', orders);
    res.status(200).json({
        msg: 'got the orders',
        orders: orders
    });
});

//Update order comment PUT /order/updateComment/:orderId
router.post('/updateComment', (req, res) => {
    let { restaurantOrderId, comment } = req.body;
    updateComment(restaurantOrderId, comment);
    res.status(200).json({ msg: 'updated the order comment' });
});

//Cancel order (customer): DELETE /order/cancelOrder/:orderId
router.post('/cancelOrder', (req, res) => {
    let { restaurantOrderId } = req.body;
    cancelOrder(restaurantOrderId);
    res.status(200).json({ msg: 'Cancelled the order' });
});

// gets the order status
router.get('/orderStatus', (req, res) => {
    let { restaurantOrderId } = req.body;
    orderStatus(restaurantOrderId);
    res.status(200).json({ msg: 'Retrieved the order status' });
});

// update the order status
router.put('/setOrderStatus', (req, res) => {
    let { restaurantOrderId } = req.body;
    setOrderStatus(restaurantOrderId);
    res.status(200).json({ msg: 'Set the order status' });
});


module.exports = router;
