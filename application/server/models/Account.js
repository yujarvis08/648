const db = require('../db');

exports.insertAccount = (account) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO account(userType, email, password) 
                VALUES("${account.userType}", "${account.email}", "${account.password}")`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            console.log('Inserted user into DB. User ID:', result.insertId);
            return resolve(result);
        });
    });
}
