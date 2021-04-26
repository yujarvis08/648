const request = require('supertest');
const app = require('./../../server');

test('Creating an order', async () => {
    await request(app).post('/api/orders/create')
    .send({
        restaurantId: 2,
    }).expect(200);
});


test('Getting the orders', async () => {
    await request(app).post('/api/orders/getOrders')
    .send({
        restaurantId: 1
    }).expect(200);
});

test('updating the comments', async () => {
    await request(app).post('/api/orders/updateComment')
    .send({
        restaurantOrderId: 2,
        comment: 'Put the food in the cs lab'
    }).expect(200);
})

test('deleting an order', async () => {
    await request(app).post('/api/orders/cancelOrder')
    .send({
        restaurantOrderId: 1
    }).expect(200);
})

test('getting the order status', async () => {
    await request(app).post('/api/orders/orderStatus')
    .send({
        restaurantOrderId: 1
    }).expect(200);
})