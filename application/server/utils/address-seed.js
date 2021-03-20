const AddressModel = require('../models/Address')
const db = require('../db');

const addresses = [
    {
        line1: "829 Cheetos Dr.",
        line2: "'Awesome burgers. Come get some!'",
        city: "San Francisco",
        state: "California",
        zipcode: 99999
    }
]

addresses.forEach(address => {
    AddressModel.insertAddress(address);
});

// close mysql connection
db.end(function(err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});
