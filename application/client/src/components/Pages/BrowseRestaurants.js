import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SearchAPI from '../../api/search.js';
// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Dropdown from "react-bootstrap/Dropdown";
import Image from 'react-bootstrap/Image';

/**
 * This component displays a list of restaurants available to order from.
 * It is rendered when the URI is:  /search/restaurant?cuisine=<cuisine>
 *                                  /search/restaurant?name=<name>
 * Devs: Roberto
 */
const BrowseRestaurants = () => {
    const [restaurants, setRestaurants] = React.useState([]);
    const query = new URLSearchParams(useLocation().search);
    const history = useHistory();

    function sortByPrice() {
        let filtered = restaurants.sort((a, b) => {
            if (a.priceRating < b.priceRating) return -1
            if (a.priceRating > b.priceRating) return 1
            return 0
        })
        setRestaurants(filtered);
    }

    /**
     * Changes the URL to display the restaurant's menu page
     * @param {object} restaurant 
     */
    function selectRestaurant(restaurant) {
        history.push(`/restaurant-menu?name=${restaurant.name}`)
    }

    /**
     * Gets the cuisine or restaurant name from the URL query string, then
     * it sets the restaurants state variable to the response from the API call
     */
    React.useEffect(async () => {
        let response;
        if (query.get('cuisine')) {
            let cuisine = decodeURIComponent(query.get("cuisine"));
            response = await SearchAPI.searchRestaurantsByCuisine(cuisine);
        } else {
            let name = decodeURIComponent(query.get("name"));
            response = await SearchAPI.searchRestaurantsByName(name);
        }
        console.log()
        setRestaurants(response.restaurants);
    }, [query.get('cuisine'), query.get('name')]);

    return (
        <Container>
            {/* Restaurant Cards */}
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="filter-btn">
                    Sort
            </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" onClick={sortByPrice}>Sort by price rating</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Row className="d-flex justify-content-center">
                {restaurants.map((restaurant, index) => {
                    return (
                        <Card
                            key={restaurant.restaurantId}
                            style={{ width: "18rem" }}
                            className="m-3"
                            onClick={() => selectRestaurant(restaurant)}
                        >
                            <Card.Img variant="top" src={restaurant.imagePath} />
                            <Card.Body>
                                <Card.Title>{restaurant.name}</Card.Title>
                                <Card.Text>{restaurant.description}</Card.Text>
                                <Card.Text>{restaurant.priceRating}</Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        </Container>
    )
}

export default BrowseRestaurants;