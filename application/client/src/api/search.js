
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

export default {
    searchRestaurantsByCuisine,
    searchRestaurantsByName
}
