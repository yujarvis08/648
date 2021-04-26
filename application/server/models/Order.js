const db = require('../db');

exports.insertOrder = restaurantId => {
	return new Promise((resolve, reject) => {

        let sql = `INSERT INTO restaurantOrder(restaurantId, orderStatus)
					VALUES(${restaurantId}, "restaurant is preparing")`;

		db.query(sql, (err, result) => {
			if (err) return reject(err);
			// console.log('Inserted menuItem into DB. itemId:', result.insertId);
			resolve(result);
		})
    });
}

exports.getOrders = restaurantId => {
	return new Promise((resolve, reject) => {

        let sql = `SELECT * FROM restaurantOrder
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