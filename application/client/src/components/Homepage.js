import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";
// import { v4 as uuidv4 } from 'uuid';

const Homepage = () => {

  const [cuisines, setCuisines] = React.useState([]);
  const [restaurants, setRestaurants] = React.useState([]);

  async function fetchCuisines() {
    let response = await (await fetch('/api/search/restaurant/cuisines')).json();
    let cuisinesArr = ["All"];

    for (let cuisine of response.cuisines)
      cuisinesArr.push(cuisine.cuisine);

    return cuisinesArr;
  }

  async function searchRestaurantsByName(name) {
    let response = await (await fetch(`/api/search/restaurant?name=${name}`)).json();
    setRestaurants(response.restaurants);
  }

  async function searchRestaurantsByCuisine(cuisine) {
    if (cuisine === "All") searchRestaurantsByName("");
    let response = await (await fetch(`/api/search/restaurant?cuisine=${cuisine}`)).json();
    setRestaurants(response.restaurants);
  }

  // const cuisineFilter = async (cuisine) => {
  //   console.log('cuisine:', cuisine);
  //   let rest = await fetchRestaurants('');
  //   console.log('rest', rest)
  //   let filterRest = rest.filter(restaurant => restaurant.cuisine === cuisine);
  //   setRestaurants(filterRest);
  // }

  React.useEffect(() => {
    fetchCuisines().then(setCuisines);
  }, []);

  console.log('Restaurants', restaurants);
  // console.log('Cuisines', cuisines);

  return (
    <Container className="bg-white">
      <Row className="justify-content-around">
        <p>Software Engineering Class SFSU</p>
        <p>Spring 2021</p>
        <p>Section 03</p>
        <p>Team 03</p>
      </Row>

      <Form>
        <Form.Row className="align-items-center">

          <Col lg="8" className="m-auto">
            {/* Label for screen readers only */}
            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
              Enter a restaurant's name
            </Form.Label>

            <InputGroup className="mb-2">
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title="Cuisines"
                id="dropdown-cuisines"
                onSelect={searchRestaurantsByCuisine}
              >
                {/* Cuisine dropdown item list */}
                {cuisines.map((cuisine, index) => {
                  return (
                    <Dropdown.Item key={index} eventKey={cuisine}>
                      {cuisine}
                    </Dropdown.Item>)
                })}

              </DropdownButton>

              <FormControl
                id="inlineFormInputGroup"
                placeholder="Enter a restaurant's name"
                onChange={e => searchRestaurantsByName(e.target.value)}
              />
            </InputGroup>
          </Col>

          <CardColumns>
            {restaurants.map((restaurant, index) => {
              return (
                <Card key={restaurant.restaurantId} style={{ width: '18rem' }}>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>{restaurant.name}</Card.Title>
                    <Card.Text>{restaurant.description}</Card.Text>
                    <Card.Text>{restaurant.priceRating}</Card.Text>
                  </Card.Body>
                </Card>
              )
            })
            }
          </CardColumns>

        </Form.Row>
      </Form>

    </Container>
  );
};

export default Homepage;
{/* <Tabs defaultActiveKey="Alex" id="uncontrolled-tab-example">
        <Tab eventKey="Alex" title="Alex">
          <Alex />
        </Tab>
        <Tab eventKey="Amit" title="Amit">

          <Amit />
        </Tab>

        <Tab eventKey="Angela" title="Angela">
          <Angela />

        </Tab>
        <Tab eventKey="Jacob" title="Jacob">
          <Jacob />
        </Tab>
        <Tab eventKey="Jarvis" title="Jarvis">
          <Jarvis />
        </Tab>
        <Tab eventKey="Roberto" title="Roberto">
          <Roberto />
        </Tab>
      </Tabs> */}