const request = require('supertest');
const app = require('./../../server');

test('Testing login', async () => {
    await request(app).post('/api/auth/login')
    .send({
        username: 'test',
        email: 'test@test.com',
        password: 'test123'
    }).expect(200);
});
