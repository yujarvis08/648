const request = require('supertest');
const app = require('./../../server');

test('Testing registration', async () => {
    fakeEmail = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    await request(app).post('/api/registration/restaurantOwner')
    .send({
        userType: 'restaurantOwner',
        name: 'testname',
        email: fakeEmail + '@restaurant.com',
        password: 'test123'
    }).expect(200);
});
