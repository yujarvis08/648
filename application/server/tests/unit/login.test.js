const request = require('supertest');
const app = require('./../../server');

// user exists in the database
test('Testing login', async () => {
    await request(app).post('/api/auth/login')
    .send({
        username: 'test',
        email: 'owner1@restaurant.com',
        password: 'test123'
    }).expect(200);
});

// user exists in the database but password is wrong
test('Testing login', async () => {
    await request(app).post('/api/auth/login')
    .send({
        username: 'test',
        email: 'owner1@restaurant.com',
        password: 'wrongPassword'
    }).expect(200);
});

// user does not exist
test('Testing login', async () => {
    await request(app).post('/api/auth/login')
    .send({
        username: 'nonexistant-user',
        email: 'emailThatIsNotInDatabase@test.com',
        password: 'test123'
    }).expect(404);
});
