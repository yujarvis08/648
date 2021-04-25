/** 
 * Uses an SQL file to create the database schema.
 * The SQL file is read and cleaned up from all lines with comments
 * Written by Alex and Roberto
 */
require('dotenv').config();
const mysql = require('mysql');
const fs = require('fs');
let sqlFile;

if (process.env.NODE_ENV === 'test') {
    sqlFile = 'testdb.sql';
} else {
    sqlFile = 'team3db.sql';
}

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(`>>> MySQL connected.`);
});

let newSql = '';

// Clean up the sql file
try {
    console.log(`Creating database with ${sqlFile}`);
    const sql = fs.readFileSync(`${__dirname}/${sqlFile}`, 'utf8');
    let isComment = true;
    for (let i = 0; i < sql.length; i++) {
        if (!isComment && sql[i] != '\n') {
            newSql += sql[i];
        }
        // checks for comments
        if (sql[i] === '\n') {
            if (sql[i + 1] != null && sql[i + 1] === '-') {
                isComment = true;
            } else {
                isComment = false;
            }
        }
    }

} catch (e) {
    console.log('Error:', e.stack);
}

// Execute all queries to create the database as well as initiate the tables
const queryArray = newSql.split(';')
queryArray.forEach(query => {
    if (query) {
        db.query(query, (err, result) => {
            if (err) throw err;
        });
    }
});

db.end((err, result) => {
    if (err) throw err;
    console.log('>>> Database created and tables initiated (empty)...');
    console.log('>>> Disconnected from database!');
});