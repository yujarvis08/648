import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import Dropdown from "react-bootstrap/Dropdown";


const BrowseRestaurants = () => {
    const [restaurants, setRestaurants] = React.useState([]);
    const query = new URLSearchParams(useLocation().search);

    function sortByPrice() {
        let filtered = restaurants.sort((a, b) => {
            if (a.priceRating < b.priceRating) return -1
            if (a.priceRating > b.priceRating) return 1
            return 0
        })
        setRestaurants(filtered);
    }

    /**
    * Submits a search query to DB to find restaurants that match 'cuisine'
    * @param {String} cuisine the restaurant cuisine
    */
    async function searchRestaurantsByCuisine(cuisine) {
        if (cuisine === "All cuisines") {
            searchRestaurantsByName("");
        } else {
            try {
                let response = await (
                    await fetch(`/api/search/restaurant?cuisine=${cuisine}`)
                ).json();
                setRestaurants(response.restaurants);
            } catch (err) {
                console.log(err);
            }
        }
    }

    /**
   * Submits a search query to DB to find restaurants that match 'name'
   * @param {String} name the restaurant name
   */
    async function searchRestaurantsByName(name) {
        name = name.trim(); // clean any white spaces before and after
        try {
            let response = await (
                await fetch(`/api/search/restaurant?name=${name}`)
            ).json();
            setRestaurants(response.restaurants);
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        console.log('Name query:', query.get('name'));
        if (query.get('cuisine')) {
            searchRestaurantsByCuisine(query.get("cuisine"));
        } else {
            searchRestaurantsByName(query.get('name'))
        }
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