const request = require('supertest');
const app = require('./../../server');
let fakeEmail; // to revert back

test('Testing change email endpoint when email exists', async () => {
    await request(app).post('/api/accountInfo/changeEmail')
    .send({
        email: 'owner1@restaurant.com',
        newEmail:  'owner2@restaurant.com',
    }).expect(409); // 409 Conflict, email already exists
});

test('Changing password', async () => {
    await request(app).post('/api/accountInfo/changePassword')
    .send({
        email: 'owner1@restaurant.com',
        newPassword:  'newPassword',
    }).expect(200);
});

test('Deleting account', async () => {
    await request(app).put('/api/accountInfo/deleteAccount')
    .send({
        email: 'owner3@restaurant.com'
    })
});

/* This test works but to use it you have to update the email/*
test('Testing change email endpoint', async () => {
    fakeEmail = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    await request(app).post('/api/accountInfo/changeEmail')
    .send({
        email: 'lfjhp@restaurant.com',
        newEmail: fakeEmail + '@restaurant.com',
    }).expect(200);
});
*/
