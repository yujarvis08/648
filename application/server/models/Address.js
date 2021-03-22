const db = require('../db');

exports.insertAddress = (address) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO address(line1, line2, city, state, zipcode) ` +
            `VALUES("${address.line1}", "${address.line2}", "${address.city}",`
            + `"${address.state}", ${address.zipcode})`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log('Inserted address into DB. addressId:', result.insertedId);
            return resolve(result);
        });
    });
};