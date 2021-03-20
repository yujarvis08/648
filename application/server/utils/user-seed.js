const UserModel = require('../models/User')
const db = require('../db');

const users = [0, 0, 0];

users.forEach(user => {
    UserModel.insertUser();
});

// close mysql connection
db.end(function(err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});
