const db = require('../db');

exports.insertAccount = (account) => {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO account(userType, email, password) 
                VALUES("${account.userType}", "${account.email}", "${account.password}")`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted user into DB. User ID:', result.insertId);
            return resolve(result);
        });
    });
}

exports.deleteAll = () => {
    return new Promise((resolve, reject) => {

        let sql = `DELETE FROM account WHERE accountId > -1`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getIdFromEmail = (email) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id FROM account WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.getAccountFromEmail = (email) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM account WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.deleteAccountByEmail = (email) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM account WHERE email = '${email}'`;
        // let sql = `DELETE FROM account WHERE (email = '${email}' AND accountId <> 0)`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}
