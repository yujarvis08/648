const db = require('../db');

exports.insertOwner = (restaurantOwner) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO restaurantOwner(name, accountId) ` +
            `VALUES("${restaurantOwner.name}", ${restaurantOwner.accountId})`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log('Inserted restaurantOwner into DB.', result.insertId);
            return resolve(result)
        });
    });
}

