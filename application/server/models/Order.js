const db = require('../db');

exports.insertOrder = (order) => {
	return new Promise((resolve, reject) => {

		let sql = `INSERT INTO 
            restaurantOrder(
				restaurantId,
				orderStatus, 
				customerId, 
				addressId, 
				comment, 
				total)
			VALUES(
				${order.restaurantId}, 
				"ordered", 
				${order.customerId},
				${order.addressId},
				'${order.instructions}',
				${order.total})`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			// console.log('Inserted menuItem into DB. itemId:', result.insertId);
			return resolve(result);
		})
	});
}

/* need to get orders that are not delivered*/
exports.getOrders = (accountId) => {
	return new Promise(async (resolve, reject) => {

		let result = await getRestaurantIdFromAccountId(accountId);
		let restaurantId = result[0].restaurantId;
		console.log('getOrders => restaurantId:', restaurantId);
		// TODO: Orders should have their own address...
		let sql = `SELECT 
				ord.orderId,
				ord.orderStatus,
				ord.comment,
				ord.total,
				address.line1,
				address.line2,
				address.city,
				address.state,
				address.zipcode,
				customer.name
				FROM restaurantOrder ord
				JOIN customer ON customer.customerId = ord.customerId
				JOIN address ON address.addressId = ord.addressId
				WHERE ord.restaurantId = ${restaurantId} AND 
				ord.orderStatus != 'delivered'`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('getting orders:', result);
			return resolve(result);
		})
	});
}

exports.getRestaurantIdFromMenuItemId = menuItemId => {
	return new Promise((resolve, reject) => {
		let sql = `SELECT res.restaurantId
		FROM menuItem mi
		JOIN menu ON menu.menuId = mi.menuId
		JOIN restaurant res ON res.restaurantId = menu.restaurantId
		WHERE mi.menuItemId = ${menuItemId}`;
		db.query(sql, (err, result) => {
			if (err) return reject(err);
			return resolve(result);
		});
	});
}

const getRestaurantIdFromAccountId = accountId => {
	return new Promise((resolve, reject) => {
		console.log('inside getrestaurantId model accountId:', accountId);
		let sql = `SELECT restaurantId FROM deliveryDriver
            WHERE accountId = ${accountId}`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('getting orders:', result);
			return resolve(result);
		});
	});
}

/*set order status of order */
exports.setStatus = (orderId, orderStatus) => {
	return new Promise((resolve, reject) => {

		let sql = `UPDATE restaurantOrder
                SET orderStatus = '${orderStatus}' 
				WHERE orderId = ${orderId}`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('getting orders:', result);
			return resolve(result);
		})
	});
}

exports.updateComment = (restaurantOrderId, comment) => {
	return new Promise((resolve, reject) => {

		let sql = `UPDATE restaurantOrder
				SET comment = "${comment}"
				WHERE orderId = ${restaurantOrderId}`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('getting orders:', result);
			return resolve(result);
		})
	});
}

exports.cancelOrder = (restaurantOrderId) => {
	return new Promise((resolve, reject) => {

		let sql = `DELETE FROM restaurantOrder
				WHERE orderId = ${restaurantOrderId}`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('getting orders:', result);
			return resolve(result);
		})
	});
}

exports.orderStatus = (restaurantOrderId) => {
	return new Promise((resolve, reject) => {

		let sql = `SELECT orderStatus FROM restaurantOrder
				WHERE orderId = ${restaurantOrderId}`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('getting orders:', result);
			return resolve(result);
		})
	});
}
