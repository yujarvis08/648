const express = require('express');
const router = express.Router();

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

//Get order: GET /order/orderId
router.get('/getOrders', (req, res) => {
    let { restaurantId } = req.body;
    getOrders(restaurantId);
    res.status(200).json({ msg: 'got the orders' });
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
