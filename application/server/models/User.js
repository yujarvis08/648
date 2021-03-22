const db = require('../db');

exports.insertUser = (userType) => {
    return new Promise((resolve, reject) => {
        let sql = `INSERT INTO user(userType) VALUES("${userType}")`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log('Inserted user into DB. User ID:', result.insertId);
            return resolve(result);
        });
    });
}
