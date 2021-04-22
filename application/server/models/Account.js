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

let getIdFromEmail = email => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT accountId FROM account WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}
exports.getIdFromEmail;

exports.getAccountFromEmail = email => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM account WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.deleteAccountByEmail = email => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM account WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.changeEmail = (email, newEmail) => {
    return new Promise( async (resolve, reject) => {
        let response = await getIdFromEmail(email);
        let checkDupe = await getIdFromEmail(newEmail);
        if (checkDupe[0] && checkDupe[0].accountId) {
            return resolve(new Error('duplicate email'));
        }
        let sql = `UPDATE account 
            SET email = "${newEmail}"
            WHERE accountId = ${response[0].accountId}`;

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

exports.changePassword = (email, newPassword) => {
    return new Promise( async (resolve, reject) => {
        let response = await getIdFromEmail(email);
        let sql = `UPDATE account
            SET password = '${newPassword}'
            WHERE accountId = '${response[0].accountId}'`;
        console.log(sql);

        db.query(sql, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}
