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

/* TODO, need to attach order to accountId somewhere */
exports.checkout = (restaurantId) => {
	return new Promise((resolve, reject) => {
        order.insertOrder(restaurantId);
    });
}

exports.delete = (shoppingCartId) => {
	return new Promise((resolve, reject) => {
        sql = `DELETE FROM shoppingCart 
            WHERE shoppingCardId = ${shoppingCardId}`;

        db.query(sql, (err, result) => {
			if (err) return reject(err);
			console.log('Inserted into shoppingCart:', result);
			resolve(result);
		});

    });
}
