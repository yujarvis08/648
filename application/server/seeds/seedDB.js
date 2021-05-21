/**
 * ! To seed properly, begin with an empty DB (npm run seed:db)
 * Seeds 9 different accounts: 3 customer, 5 owners, 1 driver
 * Seeds 5 restaurants
 * Seeds 5 addresses (1 for each restaurant)
 * Seeds 5 menus (1 for each restaurant)
 * Seeds 5 - 7 menu items in each menu
 */
const db = require('../db');
const bcrypt = require('bcrypt-nodejs');

let salt = bcrypt.genSaltSync();
const accounts = [
    [
        "customer",
        "customer1@sfsu.edu",
        bcrypt.hashSync('testpass', salt)
    ],
    [
        "customer",
        "customer2@sfsu.edu",
        bcrypt.hashSync('testpass', salt)
    ],
    [
        "customer",
        "customer3@mail.sfsu.edu",
        bcrypt.hashSync('testpass', salt)
    ],
    [
        "restaurantOwner",
        "owner1@restaurant.com",
        bcrypt.hashSync('testpass', salt)
    ],
    [
        "restaurantOwner",
        "owner2@restaurant.com",
        bcrypt.hashSync('testpass', salt)
    ],
    [
        "restaurantOwner",
        "owner3@restaurant.com",
        bcrypt.hashSync('testpass', salt)
    ],
    [
        "restaurantOwner",
        "owner4@restaurant.com",
        bcrypt.hashSync('testpass', salt)
    ],
    [
        "restaurantOwner",
        "owner5@restaurant.com",
        bcrypt.hashSync('testpass', salt)
    ],
    [
        "deliveryDriver",
        "driver@mail.com",
        bcrypt.hashSync('testpass', salt)
    ],
]
// name, accountId
const restaurantOwners = [
    [
        "Tina",
        4,
    ],
    [
        "Aleander",
        5,
    ],
    [
        "Elizabeth",
        6,
    ],
    [
        "Aaron",
        7,
    ],
    [
        "Bruce",
        8,
    ]
]
/**
 * restaurantId
 * name
 * cuisine
 * priceRating
 * restaurantOwner
 * imagePath
 * approved
 * lat
 * lng
 * distance
 */
const restaurants = [
    [
        1,
        "Bob's Burgers",
        "Awesome burgers. Come get some!",
        "American",
        '$$',
        1,
        "/assets/images/restaurant/burger.jpeg",
        1,
        37.719714,
        -122.4743764,
        1.09
    ],
    [
        2,
        "Infinite Tacos",
        "Best tacos in the bay.",
        "Mexican",
        '$',
        2,
        "/assets/images/restaurant/tacos.jpeg",
        1,
        37.7264129,
        -122.4785103,
        0.48
    ],
    [
        3,
        "Pizzarino",
        "Delicious pizza and even better pasta. Yum!",
        "Italian",
        '$$$',
        3,
        "/assets/images/restaurant/pizza.jpeg",
        1,
        37.7162382,
        -122.4719116,
        0.82
    ],
    [
        4,
        "Brain Freeze",
        "Traditional flavors. Home-made ice cream and desserts.",
        "Dessert",
        '$',
        4,
        "/assets/images/restaurant/desserts.jpeg",
        1,
        37.7086735,
        -122.4881102,
        1.07
    ],
    [
        5,
        "Dynamic Coffee",
        "Get your morning started the right way! Premium coffee in a relaxing atmosphere.",
        "Cafe",
        '$',
        5,
        "/assets/images/restaurant/cafe.jpeg",
        1,
        37.7302584,
        -122.4785401,
        1.53
    ],
]

const addresses = [
    [
        "1700 Ocean Ave",
        "",
        "San Francisco",
        "CA",
        94112
    ],
    [
        "255 Winston Dr",
        "",
        "San Francisco",
        "CA",
        94132
    ],
    [
        "595 Buckingham Way",
        "Suite 587",
        "San Francisco",
        "CA",
        94132
    ],
    [
        "1101 Junipero Serra Blvd",
        "",
        "San Francisco",
        "CA",
        94132
    ],
    [
        "11 Glenwood Ave",
        "",
        "Daly City",
        "CA",
        94015
    ],
]

const americanMenuItems = [
    [
        1,
        "Deluxe",
        "1/4 lb patty with tomato, onions, and lettuce.",
        9.99
    ],
    [
        1,
        "Baconator",
        "1/2 lb patty with bacon, cheese, tomato, onions and lettuce.",
        11.99
    ],
    [
        1,
        "Lettuce Wrap",
        "1/4 patty with tomato and onions wrapped in lettuce",
        8.99
    ],
    [
        1,
        "French Fries",
        "Crispy, golden brown potato fries",
        3.00
    ],
    [
        1,
        "Onion Rings",
        "Crispy fried onion rings",
        5.00
    ],
    [
        1,
        "Soda",
        "Your choice: coke, sprite, or 7up",
        2.49
    ]
]

const mexicanMenuItems = [
    [
        2,
        "Tacos Al Vapor",
        'Steamed tacos, choose chicken, beef or pork.',
        2.49
    ],
    [
        2,
        "Street Tacos",
        "Small, double tortilla, with your choice of meat.",
        1.99
    ],
    [
        2,
        "Tacos Dorados",
        "Fried tacos, choose chicken, beef, or pork.",
        1.99
    ],
    [
        2,
        "Burrito",
        "Large tortilla, choose chicken, beef or pork.",
        6.99
    ],
    [
        2,
        "Agua Fresca",
        "Traditional Mexican drink. Choose horchata, jamaica, or tamarind.",
        3.00
    ]
]

const italianMenuItems = [
    [
        3,
        "Pepperoni Pizza",
        'Pepperoni, tomato sauce, and mozzarella cheese.',
        10.99
    ],
    [
        3,
        "Hawaiian Pizza",
        "Canadian bacon, pineapple, mozzarella, tomato sauce.",
        12.99
    ],
    [
        3,
        "Fettuccine Alfredo",
        "Fettucine pasta with a creamy white sauce and chicken breast.",
        11.99
    ],
    [
        3,
        "Spaghetti A La Bolognese",
        "Spaghetti with ground beef and tomato sauce.",
        6.99
    ],
    [
        3,
        "Sparkling Water",
        "Choose between Perrier or Pellegrino.",
        2.00
    ]
]

const icecreamMenuItems = [
    [
        4,
        "Soft Serve Ice cream",
        'Choose your flavor: chocolate, vanilla, or strawberry.',
        4.00
    ],
    [
        4,
        "Smoothie",
        "Choose your flavor: mango, strawberry, banana, or mixed.",
        5.00
    ],
    [
        4,
        "Sundae",
        "Choose your ice cream flavor. Comes with bananas and strawberries drizzled with chocolate.",
        10.00
    ],
    [
        4,
        "Juice",
        "Choose your fruit flavor: straberry, orange, pineapple, or kiwi.",
        5.00
    ],
    [
        4,
        "Crepe",
        "Crepe filled with fruit and drizzled with chocolate and vanilla syrup.",
        9.00
    ]
]

const cafeMenuItems = [
    [
        5,
        "Coffee",
        'Slow dreep coffee.',
        2.99
    ],
    [
        5,
        "Espresso",
        "Jump start your morning with a shot of espresso.",
        2.99
    ],
    [
        5,
        "Frappuccino",
        "Frozen coffee drink topped with whip cream.",
        4.99
    ],
    [
        5,
        "Muffin",
        "Choose your flavor: banana and nuts or poppy seed",
        2.99
    ],
    [
        5,
        "Avocado Toast",
        "Big slice of toast with avocado spread.",
        4.99
    ]
]

const cuisineTypes = [
    'Other',
    'American',
    'Mexican',
    'Italian',
    'Dessert',
    'Cafe'
]

/**
comment
orderStatus
addressId
restaurantId
customerId
total
 */
const orderTestData = [
    [
        "Room 123 at the end of the hallway",
        'ordered',
        1,
        1,
        1,
        13.24
    ],
    [
        "Soccer field across the gym. I'll be by the bleachers",
        'ordered',
        2,
        1,
        2,
        25.16
    ],
    [
        "At the Sol Patch community garden near Mary Park Hall",
        'delivered',
        3,
        1,
        3,
        17.99
    ]
]

function insertCuisine(cuisineTypes) {
    return new Promise((resolve, reject) => {
        for (let cuisine of cuisineTypes) {
            let sql = `INSERT INTO cuisine(cuisineType)
                VALUES("${cuisine}")`;

            db.query(sql, (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });
        }
    });
}

// insert accounts
function insertAccounts(accounts) {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO account(userType, email, password) VALUES ?`;
        db.query(sql, [accounts], (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted accounts...');
            resolve(result);
        });

    });
}

// insert restaurant owners
function insertRestaurantOwners(restaurantOwners) {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO restaurantOwner(name, accountId) VALUES ?`;
        db.query(sql, [restaurantOwners], (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted restaurant owners...');
            resolve(result);
        });

    });
}

// insert addresses
function insertAddresses(addresses) {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO address(line1, line2, city, state, zipcode) VALUES ?`;
        db.query(sql, [addresses], (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted addresses...')
            return resolve(result);
        });

    });
}

// insert restaurants
function insertRestaurants(restaurants) {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO restaurant(
            ownerId, name, description, cuisine, 
            priceRating, addressId, imagePath, approved,
            lat, lng, distance) VALUES ?`;
        db.query(sql, [restaurants], (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted restaurants...');
            return resolve(result);
        });

    });
}

// insert menus
function insertMenus() {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO menu(restaurantId) VALUES ?`;
        db.query(sql, [[[1], [2], [3], [4], [5]]], (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted menus...');
            return resolve(result);
        });

    });
}

// insert menu items
function insertMenuItems(menuItems) {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO menuItem(menuId, name, description, price) VALUES ?`;
        db.query(sql, [menuItems], (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted menu items...');
            return resolve(result);
        });

    });
}

// insert delivery drivers
function insertDeliveryDrivers() {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO deliveryDriver(restaurantId, name, accountId) VALUES ?`;
        db.query(sql, [[[1, 'John', 7]]], (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted driver (works at 1st restaurant)...');
            return resolve(result);
        });

    });
}

// insert customers
function insertCustomers() {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO customer(name, accountId) VALUES ?`;
        db.query(sql, [[['Yanela', 1], ['Timbo', 2], ['Lauren', 3]]], (err, result) => {
            if (err) return reject(err);
            // console.log('Inserted customer...');
            return resolve(result);
        });

    });
}


function insertOrders(orderTestData) {
    return new Promise((resolve, reject) => {

        let sql = `INSERT INTO restaurantOrder(comment, orderStatus, addressId, restaurantId, customerId, total)
                    VALUES ?`;

        db.query(sql, [orderTestData], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });

    });
}

insertAccounts(accounts)
    .then(insertCuisine(cuisineTypes))
    .then(insertRestaurantOwners(restaurantOwners))
    .then(insertAddresses(addresses))
    .then(insertRestaurants(restaurants))
    .then(insertMenus())
    .then(insertMenuItems(americanMenuItems))
    .then(insertMenuItems(mexicanMenuItems))
    .then(insertMenuItems(italianMenuItems))
    .then(insertMenuItems(icecreamMenuItems))
    .then(insertMenuItems(cafeMenuItems))
    .then(insertDeliveryDrivers())
    .then(insertCustomers())
    .then(insertOrders(orderTestData))
    .then(db.end((err, result) => {
        if (err) throw err;
        console.log('>>> Database seeding complete.');
        console.log('>>> Disconnected from database!');
    }))
    .catch(err => console.log('Seeding error:', err));