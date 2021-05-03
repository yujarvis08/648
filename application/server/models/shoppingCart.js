const db = require('../db');
const order = require('./Order');

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
            WHERE menuItemId = ${menuItemId}`;

        db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('Inserted into shoppingCart:', result);
			resolve(result);
		});
    });
}

/* checkout creates an order and clears shopping cart*/
exports.checkout = (accountId, restaurantId) => {
	return new Promise((resolve, reject) => {
        await order.insertOrder(restaurantId);
        await clearShoppingCart(accountId);
    });
}

exports.clearShoppingCart = accountId => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM shoppingCart
            WHERE accountId = ${accountId}`;

        db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('Inserted into shoppingCart:', result);
			resolve(result);
		});
};

/* Gets all items in shopping cart in an account */
exports.getCartItems = accountId => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM shoppingCart
            WHERE accountId = ${accountId}`;
    });

}
