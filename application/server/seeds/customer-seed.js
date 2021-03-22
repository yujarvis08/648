const CustomerModel = require('../models/Customer')
const db = require('../db');

const customers = [
  {
    name: "Alex",
    userId: 1
  }, {
    name: "Marco",
    userId: 2
  },
]



customers.forEach(customer => {
  CustomerModel.insertCustomer(customer);
});

// close mysql connection
db.end(function (err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});
