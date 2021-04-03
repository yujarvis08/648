const request = require('supertest');
const app = require('./../../server');

test('Testing login', async () => {
    await request(app).post('/login')
    .send({
        username: 'test',
        email: 'test@test.com',
        password: 'test123'
    }).expect(201);
});
