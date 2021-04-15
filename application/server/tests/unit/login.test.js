const request = require('supertest');
const app = require('./../../server');

// user exists in the database
//test('Testing Login - user exists', async () => {
//    await request(app).post('/api/auth/login')
//    .send({
//        username: 'firstTest',
//        email: 'customer@mail.com',
//        password: 'testpass'
//    }).expect(200);
//});

// user exists in the database
test('Testing Login - user exists', async () => {
    await request(app).post('/api/auth/login')
    .send({
        username: 'firstTest',
        email: 'tyaty@customer.com',
        password: 'test123'
    }).expect(200);
});

//
//// user exists in the database but password is wrong
//test('Testing login - password is wrong', async () => {
//    await request(app).post('/api/auth/login')
//    .send({
//        username: 'secondTest',
//        email: 'owner1@restaurant.com',
//        password: 'wrongPassword'
//    }).expect(403);
//});
//
//// user does not exist
//test('Testing login - user does not exist', async () => {
//    await request(app).post('/api/auth/login')
//    .send({
//        username: 'nonexistant-user',
//        email: 'emailThatIsNotInDatabase@test.com',
//        password: 'test123'
//    }).expect(404);
//});
