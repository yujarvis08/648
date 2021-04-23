const express = require('express');
const router = express.Router();

const { insertOrder } = require('models/Order');

//Get order: GET /order/orderId
//Update order comment PUT /order/updateComment/:orderId
//Cancel order (customer): DELETE /order/cancelOrder/:orderId

//Create order: POST /order/create
router.post('/create', (req, res) => {
    let { restaurantId } = req.body;
    insertOrder(restaurantId);
    res.status(200).json({ msg: 'created an order' });
});

module.exports = router;
