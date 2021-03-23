let menuModel;

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    menuModel = require('../../models/Menu');
    db = require('../../db');
})

test('Inserting a menu and linking it to its respective restaurant', async () => {

    menuModel.insertMenu()
});