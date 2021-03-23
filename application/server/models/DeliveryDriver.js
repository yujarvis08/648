const db = require('../db');

exports.insertDriver = (driver) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO deliveryDriver(name, accountId, restaurantId) ` +
            `VALUES("${driver.name}", ${driver.accountId}, ${driver.restaurantId})`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log('Inserted driver into DB. driverId', result.insertId);
            return resolve(result);
        });
    });
}