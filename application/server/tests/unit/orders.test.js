const request = require('supertest');
const app = require('./../../server');

test('Creating an order', async () => {
    await request(app).post('/api/orders/restaurantOwner')
    .send({
        restaurantId: 1
    }).expect(200);
});


