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
import DriverRegistration from "./DriverRegistration";
import RestaurantRegistration from "./RestaurantRegistration";
import LoginModal from './LoginModal';

// import { v4 as uuidv4 } from 'uuid';

const Homepage = () => {
  const [cuisines, setCuisines] = React.useState([]);
  const [restaurants, setRestaurants] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  /* Login Modal use state */
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

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
        await fetch(`/api/search/restaurant?name=${name}`)
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
          await fetch(`/api/search/restaurant?cuisine=${cuisine}`)
        ).json();
        setRestaurants(response.restaurants);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleLogout() {
    let wrappedResponse = await fetch('/api/auth/logout');
    if (wrappedResponse.ok) {
      console.log('logging out');
      setIsLoggedIn(false);
    }
  }

  // const cuisineFilter = async (cuisine) => {
  //   console.log('cuisine:', cuisine);
  //   let rest = await fetchRestaurants('');
  //   console.log('rest', rest)
  //   let filterRest = rest.filter(restaurant => restaurant.cuisine === cuisine);
  //   setRestaurants(filterRest);
  // }

  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();

  //   let loginData = { email, password }
  //   console.log('Login data object:', loginData)

  //   let response = await fetch('/api/auth/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(loginData) // body data type must match "Content-Type" header)
  //   });
  //   let responseJSON = await response.json();

  //   console.log("Response from login:", responseJSON);
  // }


  React.useEffect(() => {
    // get list of unique quisines available from our DB
    fetchCuisines().then(setCuisines).catch(console.log);
    // display all restaurants on load
    searchRestaurantsByName("");
    console.log('cookie object:', document.cookie);
    let cookies = document.cookie.split('=');
    console.log('cookies split:', cookies);
    console.log('includes cookie', cookies.includes('account_id'));
    if (cookies.includes('account_id')) {
      setIsLoggedIn(true);
    }
  }, []);

  console.log("Restaurants", restaurants);
  // console.log('Cuisines', cuisines);

  return (
    // <div>
    //   {isLoggedIn && <h1>Logged In</h1>}
    //   {!isLoggedIn && <h1>Not Logged In :(</h1>}
    // </div>
    <Container className="bg-white">
      <Row className="justify-content-around">
        <p>Software Engineering Class SFSU</p>
        <p>Spring 2021</p>
        <p>Section 03</p>
        <p>Team 03</p>
      </Row>

      <div
        class="image"
        className="bg-dark"
        style={{
          width: "100%",
          height: "250px",
          backgroundImage: `url(${logo})`,
        }}
      >
        {!isLoggedIn &&
          <React.Fragment>
            <LoginModal showState={show} handleClose={handleClose} setIsLoggedIn={setIsLoggedIn} />
            <Button
              variant="primary"
              onClick={handleShow}
              style={{
                marginLeft: "1000px",
                marginTop: "15px",
                backgroundColor: "#61dafb",
                color: "black",
              }}
            >
              Login
        </Button>
          </React.Fragment>}
        {/* Login Modal */}
        {isLoggedIn &&
          <Button
            variant="primary"
            onClick={handleLogout}
            style={{
              marginLeft: "1000px",
              marginTop: "15px",
              backgroundColor: "#61dafb",
              color: "black",
            }}
          >
            Logout
  </Button>}



        <Form onSubmit={handleSubmitSearch}>
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
                    onChange={handleSelectCuisine}
                    className="bg-light border-right-0"
                    style={{ marginTop: "105px" }}
                  >
                    {cuisines.map((cuisine, index) => {
                      return <option key={index}>{cuisine}</option>;
                    })}
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
        </Form>
      </div>

      <Tabs>
        <TabList>
          <Tab>About Us</Tab>
          <Tab>SFSU Customers</Tab>
          <Tab>Restaurant Owners</Tab>
          <Tab>Delivery Drivers</Tab>
        </TabList>

        <TabPanel>
          {" "}
          {/* About Us Tab */}
          <h1>Hello there!</h1>
          <br></br>
          <h4>
            Get food delivered to any place on campus. We serve SFSU students,
            faculty and campus staff at lightning fast speeds. Simply search for
            nearby restaurants, browse their menus, place your order, and let us
            do the rest while you relax or do your schoolwork.
          </h4>
          <br></br>
          <h4>
            Restaurant owner? Join our platform! Cater to SFSU Students and
            increase your online presence and gain a band of regular, loyal
            customers.
          </h4>
          <br></br>
          <h4>
            Delivery drivers can also easily link up with their restaurant and
            begin delivering today!
          </h4>
          <img src={banner} alt="sfsu banner"></img>
        </TabPanel>

        <TabPanel>
          {" "}
          {/* SFSU Customers Tab */}
          <h1>Welcome, Gator!</h1>
          <br></br>
          <h4>
            We’re happy to have you here. Go hungry no longer! Use the search
            bar at the top and browse your favorite restaurants and cuisines.
            You may <a href="/userRegistration">register</a> now or later. In
            the meanwhile, feel free to browse our registered restaurants.
          </h4>
          {/* Restaurant Cards */}
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
        </TabPanel>

        <TabPanel>
          <h3>
            Are you a restaurant owner that wants to register?<br></br>
            <br></br>
            Creating your account and registering your restaurant is easy.
            Simply fill out this form!
          </h3>

          <RestaurantRegistration />
          <br></br>
        </TabPanel>

        <TabPanel>
          <h3>
            Registering as a driver is easy. Simply fill out the form below!
          </h3>

          <DriverRegistration />

          <br></br>
        </TabPanel>
      </Tabs>
    </Container>
  );
};

export default Homepage;
