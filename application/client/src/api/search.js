/**
 * This set of functions query information from the database about restaurants
 */


/**
* Submits a search query to DB to find restaurants that match 'cuisine'
* @param {String} cuisine the restaurant cuisine
*/
const searchRestaurantsByCuisine = async (cuisine) => {
    cuisine = cuisine.trim(); // clean any white spaces before and after
    cuisine = cuisine.replaceAll("'", "''"); // so query doesn't crash the app
    if (cuisine === "All cuisines") {
        return await searchRestaurantsByName("");
    } else {
        try {
            return await (
                await fetch(`/api/search/restaurant?cuisine=${cuisine}`)
            ).json();
        } catch (err) {
            console.log(err);
        }
    }
}

/**
* Submits a search query to DB to find restaurants that match 'name'
* @param {String} name the restaurant name
*/
const searchRestaurantsByName = async (name) => {
    name = name.trim(); // clean any white spaces before and after
    name = name.replaceAll("'", "''"); // so query doesn't crash the app
    try {
        return await (
            await fetch(`/api/search/restaurant?name=${name}`)
        ).json();
    } catch (err) {
        console.log(err);
    }
}

/**
 * Searches DB for a list of all cuisines
 * @returns an array of cuisines
 */
const getCuisines = async () => {
    try {
        let response = await (
            await fetch("/api/search/restaurant/cuisines")
        ).json();
        return response.cuisines;
    } catch (err) {
        console.log(err);
    }
}

/**
 * Requests all data about all restaurants from DB
 * @returns An array of restaurants
 */
const getRestaurants = async () => {
    try {
        let restaurantsResult = await (
            await fetch("/api/search/restaurant/restaurants")
        ).json();

        return restaurantsResult.restaurants;
    } catch (err) {
        console.log(err);
    }
}

export default {
    searchRestaurantsByCuisine,
    searchRestaurantsByName,
    getCuisines,
    getRestaurants,
}
