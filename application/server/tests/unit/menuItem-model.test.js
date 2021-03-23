require('dotenv').config();

let menuItemModel;
let menuModel;
let restaurantOwnerModel;
let restaurantModel;
let accountModel;
let db;

const restaurantOwnerAccount = {
    userType: "restaurantOwner",
    email: "restaurantOwner@mail.com",
    password: "testpass",
}
const restaurantOwner = {
    name: "Tina",
    accountId: null
}

const restaurant = {
    name: "'Bob''s Burgers'",
    desciption: "'Awesome burgers. Come get some!'",
    priceRating: 2,
    cuisine: "'American'",
    ownerId: null,
    addressId: null
}

const menuItem = {
    menuId: null,
    name: "Deluxe",
    description: "1/4 lb patty with tomato, onions, and lettuce.",
    price: 9.99
}

beforeAll(() => {
    process.env.DB_NAME = 'testdb';
    menuItemModel = require('../../models/MenuItem');
    accountModel = require('../../models/Account');
    restaurantOwnerModel = require('../../models/RestaurantOwner');
    menuModel = require('../../models/Menu');
    restaurantModel = require('../../models/Restaurant');
    db = require('../../db');
})


test('Inserting a menu item.', async () => {
    // step 1: create account
    let accountRes = await accountModel.insertAccount(restaurantOwnerAccount);
    restaurantOwner.accountId = accountRes.insertId;
    // step 2: create owner
    let ownerRes = await restaurantOwnerModel.insertOwner(restaurantOwner);
    restaurant.ownerId = ownerRes.insertId;
    // step 3: create restaurant
    let restaurantRes = await restaurantModel.insertRestaurant(restaurant);
    // step 4: create menu
    let menuRes = await menuModel.insertMenu(restaurantRes.insertId);
    menuItem.menuId = menuRes.insertId;
    // step 5: insert menu item
    let menuItemRes = await menuItemModel.insertMenuItem(menuItem)
    expect(menuItemRes.affectedRows).toBe(1);
});


afterAll(() => {
    // delete all accounts 
    // cascades to delete restaurantOwner, restaurant, menu, and menuitems)
    let sql = `DELETE FROM account WHERE accountId > -1;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    })

    // delete menu (cascades to delete menu items as well)
    sql = `DELETE FROM menu WHERE menuId > -1;`;
    db.query(sql, (err, result) => {
        if (err) throw err;
    })

    db.end();
})