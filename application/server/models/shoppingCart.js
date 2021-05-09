const db = require('../db');
const order = require('./Order');
const customer = require('./Customer');

exports.addItem = (accountId, menuItemId) => {
	return new Promise((resolve, reject) => {
        sql = `INSERT INTO shoppingCart(accountId, MenuItemId) 
            VALUES(${accountId}, ${menuItemId})`;
        db.query(sql, (err, result) => {
			if (err) return reject(err);
			console.log('Inserted into shoppingCart:', result);
			resolve(result);
		});
    });
};

exports.deleteItem = (accountId, menuItemId) => {
	return new Promise((resolve, reject) => {
        sql = `DELETE FROM shoppingCart 
            WHERE accountId = ${accountId} AND 
            menuItemId = ${menuItemId}`;

        db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('deleted menuItem from shoppingCart:', result);
			resolve(result);
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

let clearShoppingCart = accountId => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM shoppingCart
            WHERE accountId = ${accountId}`;

        db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('Inserted into shoppingCart:', result);
			resolve(result);
		});
    });
}
exports.clearShoppingCart;

/* Gets all items in shopping cart in an account */
exports.getCartItems = accountId => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM shoppingCart
            WHERE accountId = ${accountId}`;
    });

}
