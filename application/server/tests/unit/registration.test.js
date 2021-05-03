const request = require('supertest');
const app = require('./../../server');

test('Testing restaurantOwner registration', async () => {
    fakeEmail = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    await request(app).post('/api/registration/restaurantOwner')
    .send({
        name: 'testname',
        email: fakeEmail + '@restaurant.com',
        password: 'test123'
    }).expect(200);
});

test('adding menu items', async () => {
    await request(app).post('/api/registration/restaurantOwner/addMenuItem')
    .send({
        menuId: 1,
        name: 'Flapjacks (test)',
        description: 'Two mommas made flapjacks (test)',
        price: '4.99'
    }).expect(200);
});

test('Testing customer registration', async () => {
    fakeEmail = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    await request(app).post('/api/registration/customer')
    .send({
        name: 'testname',
        email: fakeEmail + '@customer.com',
        password: 'test123'
    }).expect(200);
});

test('Testing deliveryDriver registration', async () => {
    fakeEmail = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    await request(app).post('/api/registration/driver')
    .send({
        name: 'testname',
        restaurantId: 1,
        email: fakeEmail + '@customer.com',
        password: 'test123'
    }).expect(200);
});
