require('dotenv').config();

let userModel;
let db;

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    userModel = require('../../models/User');
    db = require('../../db');
})

test('Inserts user into User table', async () => {
    let result = await userModel.insertUser('restaurantOwner');
    expect(result.affectedRows).toBe(1);
});

afterAll(() => {
    db.end();
})