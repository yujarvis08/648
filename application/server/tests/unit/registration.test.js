const request = require('supertest');
const app = require('./../../server');

test('Testing login', async () => {
    await request(app).post('/api/auth/login')
    .send({
        userType: 'userType',
        name: 'testname',
        email: 'owner1@restaurant.com',
        password: 'test123'
    }).expect(200);
});
