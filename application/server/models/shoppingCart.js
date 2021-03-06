const db = require('../db');
const order = require('./Order');
const customer = require('./Customer');

exports.addItem = (accountId, menuItemId) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO shoppingCart(accountId, MenuItemId) 
            VALUES(${accountId}, ${menuItemId})`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
};

exports.deleteItem = (accountId, menuItemId) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM shoppingCart 
            WHERE accountId = ${accountId} AND 
            menuItemId = ${menuItemId} LIMIT 1`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

/* checkout creates an order and clears shopping cart*/
exports.checkout = async (accountId, restaurantId) => {
    return new Promise(async (resolve, reject) => {
        let result = await customer.getCustomerId(accountId);
        let { customerId } = result[0];
        console.log(customerId);
        await order.insertOrder(customerId, restaurantId);
        await clearShoppingCart(accountId);
    });
}

exports.clear = accountId => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM shoppingCart
            WHERE accountId = ${accountId}`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            //console.log('Inserted into shoppingCart:', result);
            return resolve(result);
        });
    });
}


/* Gets all items in shopping cart in an account */
exports.getCartItems = accountId => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT sc.menuItemId, mi.name, mi.description, mi.price
        FROM shoppingCart sc
        JOIN menuItem mi ON mi.menuItemId = sc.menuItemId
        WHERE accountId = ${accountId}`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });

}
