const db = require('../db');

exports.insertOrder = (customerId, restaurantId) => {
	return new Promise((resolve, reject) => {

		let sql = `INSERT INTO 
            restaurantOrder(restaurantId, orderStatus, customerId, address)
			VALUES(${restaurantId}, 
            "restaurant is preparing", 
            ${customerId},
            '200 broadyway, san Francisco')`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			// console.log('Inserted menuItem into DB. itemId:', result.insertId);
			resolve(result);
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
			resolve(result);
		})
	});
}

let getRestaurantIdFromAccountId = accountId => {
	return new Promise((resolve, reject) => {
		console.log('inside getrestaurantId model accountId:', accountId);
		let sql = `SELECT restaurantId FROM deliveryDriver
            WHERE accountId = ${accountId}`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('getting orders:', result);
			resolve(result);
		});
	});
}

/*set order status of order */
exports.setOrder = (restaurantId, orderStatus) => {
	return new Promise((resolve, reject) => {

		let sql = `UPDATE restaurantOrder
                SET orderStatus = ${orderStatus} 
				WHERE restaurantId = ${restaurantId}`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			//console.log('getting orders:', result);
			resolve(result);
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
			resolve(result);
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
			resolve(result);
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
			resolve(result);
		})
	});
}
