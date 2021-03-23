const accountModel = require('../models/Account');
const customerModel = require('../models/Customer');
const restaurantOwnerModel = require('../models/RestaurantOwner');
const restaurantModel = require('../models/Restaurant');
const addressModel = require('../models/Address');
const deliveryDriverModel = require('../models/DeliveryDriver');
const menuModel = require('../models/Menu');
const menuItemModel = require('../models/MenuItem');
const db = require('../db');


// ! delivery driver must be created AFTER restaurant
const accounts = [
	{
		userType: "customer",
		email: "customer@mail.com",
		password: "testpass",
	},
	{
		userType: "restaurantOwner",
		email: "owner@restaurant.com",
		password: "testpass",
	},
	{
		userType: "deliveryDriver",
		email: "driver@mail.com",
		password: "testpass",
	},
]

seed(accounts);
// create an account for each type of user
// also creates a restaurant for the owner (no menu yet)
async function seed(accounts) {
	try {
		for (const account of accounts) {

			let accountRes = await accountModel.insertAccount(account);

			if (account.userType === 'customer') {

				let customer = {
					name: "Alex",
					accountId: accountRes.insertId
				}

				await customerModel.insertCustomer(customer);

				// insert restaurant owner (make restaurant too)
			} else if (account.userType === 'restaurantOwner') {

				let owner = {
					name: "Tina",
					accountId: accountRes.insertId
				}
				let ownerRes = await restaurantOwnerModel.insertOwner(owner)

				// insert restaurant address
				let address = {
					line1: "829 Cheetos Dr.",
					line2: "suite 8",
					city: "San Francisco",
					state: "California",
					zipcode: 99999
				}
				let addressRes = await addressModel.insertAddress(address);

				// create restaurant
				let restaurant = {
					name: "'Bob''s Burgers'",
					desciption: "'Awesome burgers. Come get some!'",
					priceRating: 2,
					cuisine: "'American'",
					ownerId: ownerRes.insertId,
					addressId: addressRes.insertId,
				}

				let restaurantRes = await restaurantModel.insertRestaurant(restaurant);

				// create menu
				let menuRes = await menuModel.insertMenu(restaurantRes.insertId);

				// insert items into menu
				let menuItems = [
					{
						name: "Deluxe",
						description: '1/4 lb patty with tomato, onions, and lettuce.',
						price: 9.99
					},
					{
						name: "Baconator",
						description: "1/2 lb patty with bacon, cheese, tomato, onions and lettuce.",
						price: 11.99
					},
					{
						name: "Lettuce Wrap",
						description: "1/4 patty with tomato and onions wrapped in lettuce",
						price: 8.99
					},
					{
						name: "French Fries",
						description: "Crispy, golden brown potato fries",
						price: 3.00
					},
					{
						name: "Onion Rings",
						description: "Crispy fried onion rings",
						price: 5.00
					},
					{
						name: "Soda",
						description: "Your choice: coke, sprite, or 7up",
						price: 2.49
					}
				]

				for (let item of menuItems) {
					item.menuId = menuRes.insertId;
					await menuItemModel.insertMenuItem(item);
				}

				// insert delivery driver (link to restaurant)
			} else if (account.userType === 'deliveryDriver') {

				let restaurants = await restaurantModel.getAll();

				let deliveryDriver = {
					name: "Tyrone",
					accountId: accountRes.insertId,
					restaurantId: restaurants[0].restaurantId,
				}

				await deliveryDriverModel.insertDriver(deliveryDriver);
			} // end of if
		} // end of for loop
	} catch (err) {
		console.log('>>> Error seeding.\n', err);
	}
	db.end((err) => {
		if (err) {
			return console.log('error closing db connection:' + err.message);
		}
		console.log('Database connection closed.');
	});
}
