const request = require('supertest');
const app = require('./../../server');
let fakeEmail; // to revert back

/* This test works but you cant run more than once
because it changes the email */
/*
test('Testing change email endpoint', async () => {
    fakeEmail = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    await request(app).post('/api/accountInfo/changeEmail')
    .send({
        email: 'lfjhp@restaurant.com',
        newEmail: fakeEmail + '@restaurant.com',
    }).expect(200);
});
*/

test('Testing change email endpoint when email exists', async () => {
    await request(app).post('/api/accountInfo/changeEmail')
    .send({
        email: 'puajr@customer.com',
        newEmail:  'jilbo@customer.com',
    }).expect(409); // 409 Conflict, email already exists
});

test('Changing password' async () => {
    await request(app).post('/api/accountInfo/changePassword')
    .send({
        email: 'puajr@customer.com',
        newEmail:  'jilbo@customer.com',
    }).expect(409); // 409 Conflict, email already exists
});

/* sets email back to how it was but its not working*/
/*
afterAll( () => {
    request(app).post('/api/accountInfo/changeEmail')
    .send({
        email: fakeEmail + '@restaurant.com',
        newEmail: 'lfjhp@restaurant.com',
    }).expect(200);

});
*/


