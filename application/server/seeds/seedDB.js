/**
 * ! To seed properly, begin with an empty DB
 * Seeds 7 different accounts: 1 customer, 5 owners, 1 driver
 * Seeds 5 restaurants
 * Seeds 5 addresses (1 for each restaurant)
 * Seeds 5 menus (1 for each restaurant)
 * Seeds 5 - 7 menu items in each menu
 */
const db = require('../db');

const accounts = [
    [
        "customer",
        "customer@mail.com",
        "testpass",
    ],
    [
        "restaurantOwner",
        "owner1@restaurant.com",
        "testpass",
    ],
    [
        "restaurantOwner",
        "owner2@restaurant.com",
        "testpass",
    ],
    [
        "restaurantOwner",
        "owner3@restaurant.com",
        "testpass",
    ],
    [
        "restaurantOwner",
        "owner4@restaurant.com",
        "testpass",
    ],
    [
        "restaurantOwner",
        "owner5@restaurant.com",
        "testpass",
    ],
    [
        "deliveryDriver",
        "driver@mail.com",
        "testpass",
    ],
]

const restaurantOwners = [
    [
        "Tina",
        2
    ],
    [
        "Aleander",
        3
    ],
    [
        "Elizabeth",
        4
    ],
    [
        "Aaron",
        5
    ],
    [
        "Bruce",
        6
    ]
]

const restaurants = [
    [
        1,
        "Bob''s Burgers",
        "Awesome burgers. Come get some!",
        "'American'",
        2,
        1
    ],
    [
        2,
        "Infinite Tacos",
        "Best tacos in the bay.",
        "'Mexican'",
        1,
        2
    ],
    [
        3,
        "Pizzarino",
        "Delicious pizza and even better pasta. Yum!",
        "'Italian'",
        3,
        3
    ],
    [
        4,
        "Brain Freeze",
        "Traditional flavors. Home-made ice cream and desserts.",
        "Dessert",
        1,
        4
    ],
    [
        5,
        "Dynamic Coffee",
        "Get your morning started the right way! Premium coffee in a relaxing atmosphere.",
        "Cafe",
        1,
        5
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

// insert accounts
let sql = `INSERT INTO account(userType, email, password) VALUES ?`;
db.query(sql, [accounts], (err, result) => {
    if (err) throw err;
    console.log('Inserted accounts...');
});

// insert restaurant owners
sql = `INSERT INTO restaurantOwner(name, accountId) VALUES ?`;
db.query(sql, [restaurantOwners], (err, result) => {
    if (err) throw err;
    console.log('Inserted restaurant owners...');
});

// insert addresses
sql = `INSERT INTO address(line1, line2, city, state, zipcode) VALUES ?`;
db.query(sql, [addresses], (err, result) => {
    if (err) throw err;
    console.log('Inserted addresses...')
})

// insert restaurants
sql = `INSERT INTO restaurant(ownerId, name, description, cuisine, priceRating, addressId) VALUES ?`;
db.query(sql, [restaurants], (err, result) => {
    if (err) throw err;
    console.log('Inserted restaurants...');
});

// insert menus
sql = `INSERT INTO menu(restaurantId) VALUES ?`;
db.query(sql, [[[1], [2], [3], [4], [5]]], (err, result) => {
    if (err) throw err;
    console.log('Inserted menus...');
});

// insert menu items
sql = `INSERT INTO menuItem(menuId, name, description, price) VALUES ?`;
db.query(sql, [americanMenuItems], (err, result) => {
    if (err) throw err;
    console.log('Inserted menu items...');
});
db.query(sql, [mexicanMenuItems], (err, result) => {
    if (err) throw err;
    console.log('Inserted menu items...');
});
db.query(sql, [italianMenuItems], (err, result) => {
    if (err) throw err;
    console.log('Inserted menu items...');
});
db.query(sql, [icecreamMenuItems], (err, result) => {
    if (err) throw err;
    console.log('Inserted menu items...');
});
db.query(sql, [cafeMenuItems], (err, result) => {
    if (err) throw err;
    console.log('Inserted menu items...');
});

// insert delivery drivers
sql = `INSERT INTO deliveryDriver(restaurantId, name, accountId) VALUES ?`;
db.query(sql, [[[1, 'John', 7]]], (err, result) => {
    if (err) throw err;
    console.log('Inserted driver (works at 1st restaurant)...');
})

// insert customers
sql = `INSERT INTO customer(name, accountId) VALUES ?`;
db.query(sql, [[['Yanela', 1]]], (err, result) => {
    if (err) throw err;
    console.log('Inserted customer...');
})

db.end((err) => {
    if (err) {
        return console.log('error closing db connection:' + err.message);
    }
    console.log('Database connection closed.');
});