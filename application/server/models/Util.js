const db = require('../db');

exports.getAllCuisines = () => {
    return new Promise((resolve, reject) => {

        let sql = `SELECT DISTINCT cuisine FROM restaurant`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log('Number of cuisines returned:', result.length);
            return resolve(result);
        });

    });
}