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
exports.checkout = (accountId, shoppingCardId) => {
	return new Promise((resolve, reject) => {
        order.insertOrder();
    });
}
