
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import logo from "../logo.svg";
import banner from "../sfsubanner.png";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";



const Resturantmenu = () => {
    const [cuisines, setCuisines] = React.useState([]);
    const [restaurants, setRestaurants] = React.useState([]);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  async function fetchCuisines() {
      try {
        let response = await (
          await fetch("/api/search/restaurant/cuisines")
        ).json();
        let cuisinesArr = ["All cuisines"];
  
        for (let cuisine of response.cuisines) cuisinesArr.push(cuisine.cuisine);
  
        return cuisinesArr;
      } catch (err) {
        console.log(err);
      }
    }
  
    function handleSubmitSearch(event) {
      event.preventDefault();
      let name = event.target.elements.restaurantSearchBar.value;
      searchRestaurantsByName(name);
    }
  
    async function searchRestaurantsByName(name) {
      name = name.trim(); // clean any white spaces before and after
      try {
        let response = await (
          await fetch('/api/search/restaurant?name=${name}')
        ).json();
        setRestaurants(response.restaurants);
      } catch (err) {
        console.log(err);
      }
    }
  
    function handleSelectCuisine(event) {
      let cuisine = event.target.value;
      searchRestaurantsByCuisine(cuisine);
    }
  
    async function searchRestaurantsByCuisine(cuisine) {
      if (cuisine === "All cuisines") {
        searchRestaurantsByName("");
      } else {
        try {
          let response = await (
            await fetch('/api/search/restaurant?cuisine=${cuisine}')
          ).json();
          setRestaurants(response.restaurants);
        } catch (err) {
          console.log(err);
        }
      }
    }


    return (
<Container className="bg-white">
      <Row className="justify-content-around">
        <p>Software Engineering Class SFSU</p>
        <p>Spring 2021</p>
        <p>Section 03</p>
        <p>Team 03</p>
      </Row>
          <Form.Row className="align-items-center">
            <Col lg="8" className="m-auto">
              {/* Label for screen readers only */}
              <Form.Label htmlFor="restaurantSearchBar" srOnly>
                Enter a restaurant's name
              </Form.Label>

              <InputGroup className="mb-2">
                {/* Cuisine options */}
                <InputGroup.Prepend>
                  <Form.Control
                    as="select"
                    id="select-cuisines"
                 //   onChange={handleSelectCuisine}
                 //   className="bg-light border-right-0"
                    style={{ marginTop: "105px" }}
                  >
                    
                     
                    )
                  </Form.Control>
                </InputGroup.Prepend>

                {/* Restaurant search bar */}
                <FormControl
               
                name="restaurantSearchBar"
                placeholder="Enter a restaurant's name"
                style={{ marginTop: "105px" }}
              // onChange={e => searchRestaurantsByName(e.target.value)}
              />

              {/* Submit search (button) */}
              <InputGroup.Append>
                <Button
                  variant="outline-secondary bg-light"
                  type="submit"
                  style={{ marginTop: "105px" }}
                >

                  Go
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Row>
     
      </Container>
  );
};

export default Resturantmenu;