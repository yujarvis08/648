const request = require('supertest');
const app = require('./../../server');

test('Testing registration', async () => {
    await request(app).post('/api/auth/createRestaurantOwner')
    .send({
        userType: 'restaurantOwner',
        name: 'testname',
        email: 'owner1@restaurant.com',
        password: 'test123'
    }).expect(200);
});
