import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SearchAPI from '../../api/search.js';
// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

    function sortNear() {
        console.log('Sorting near')
        let filtered = restaurants.sort((a, b) => {
            if (a.distance < b.distance) return -1
            if (a.distance > b.distance) return 1
            return 0
        })
        setRestaurants(filtered);
    }
    function sortFar() {
        console.log('Sorting far')
        let filtered = restaurants.sort((a, b) => {
            if (a.distance > b.distance) return -1
            if (a.distance < b.distance) return 1
            return 0
        })
        setRestaurants(filtered);
    }

    function sortCheapest() {
        console.log('Sorting cheapest')
        let filtered = restaurants.sort((a, b) => {
            if (a.priceRating < b.priceRating) return -1
            if (a.priceRating > b.priceRating) return 1
            return 0
        })
        setRestaurants(filtered);
    }
    function sortExpensive() {
        console.log('Sorting expensive')
        let filtered = restaurants.sort((a, b) => {
            if (a.priceRating > b.priceRating) return -1
            if (a.priceRating < b.priceRating) return 1
            return 0
        })
        setRestaurants(filtered);
    }
    function sortZA() {
        console.log('Sorting Z to A')
        let filtered = restaurants.sort((a, b) => {
            if (a.name > b.name) return -1
            if (a.name < b.name) return 1
            return 0
        })
        setRestaurants(filtered);
    }
    function sortAZ() {
        console.log('Sorting A to Z')
        let filtered = restaurants.sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
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
            console.log('name in browse restaurant from search:', name);
            response = await SearchAPI.searchRestaurantsByName(name);
        }
        setRestaurants(response.restaurants);
    }, [query.get('cuisine'), query.get('name')]);
    console.log('restaurants:', restaurants)
    return (
        <Container>
            {/* Restaurant Cards */}
            <Row className="mt-3">
                <Col sm={10}>
                    Found {restaurants.length} search results:
                </Col>
                <Col sm={2}>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="filter-btn">
                            Sort
                </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action1" onClick={sortCheapest}>Cheapest</Dropdown.Item>
                            <Dropdown.Item href="#/action2" onClick={sortExpensive}>Expensive</Dropdown.Item>
                            <Dropdown.Item href="#/action3" onClick={sortAZ}>A-Z</Dropdown.Item>
                            <Dropdown.Item href="#/action4" onClick={sortZA}>Z-A</Dropdown.Item>
                            <Dropdown.Item href="#/action5" onClick={sortNear}>Near</Dropdown.Item>
                            <Dropdown.Item href="#/action6" onClick={sortFar}>Far</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                {restaurants.map((restaurant, index) => {
                    return (
                        <Card
                            key={restaurant.restaurantId}
                            style={{ width: "18rem", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
                            className="m-3"
                            onClick={() => selectRestaurant(restaurant)}
                        >
                            <Card.Img variant="top" src={restaurant.imagePath} />
                            <Card.Body>
                                <Card.Title>{restaurant.name}</Card.Title>
                                <hr />
                                <Card.Text>{restaurant.description}</Card.Text>
                                <Card.Text>{restaurant.address.line1}</Card.Text>
                                <Card.Text>{restaurant.priceRating}</Card.Text>
                                <Card.Text>{restaurant.distance} miles from SFSU</Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        </Container>
    )
}

export default BrowseRestaurants;