const db = require('../db');

exports.insertCustomer = (customer) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO customer(name, accountId) ` +
            `VALUES("${customer.name}", ${customer.accountId})`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted customer into DB.', result.insertId);
            return resolve(result);
        });
    });
}

exports.getCustomerId = accountId => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT customerId from customer
            WHERE accountId = ${accountId}`

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}


