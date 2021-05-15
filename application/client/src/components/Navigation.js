/**
 * This component is composed of our App's name, logo, search bar, and
 * login/menu button. The login and menu button is conditionally rendered
 * depending on the login state of the user.
 * 
 * The search bar applies input validation via html (<40 alphanum chars except for
 * apostrophes)
 */

// libraries
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
// images
import hermesLogo from "./nav-hermesLogo.png";
// components
import LoginModal from './LoginModal';
import ShoppingCart from './ShoppingCart';

const Navigation = ({ handleLogout, isLoggedIn, setIsLoggedIn }) => {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showCartModal, setShowCartModal] = React.useState(false);
  const [cartItems, setCartItems] = React.useState({});
  const [cartTotal, setCartTotal] = React.useState(0.00);
  const [cuisines, setCuisines] = React.useState([]);
  const history = useHistory();
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleCloseCartModal = () => setShowCartModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleShowCartModal = async () => {
    let result = await (await fetch('/api/shoppingCart')).json();

    let total = result.cart.total;
    let items = result.cart;
    delete items["total"];
    console.log('items:', items)
    setCartItems(items);
    setCartTotal(total);
    setShowCartModal(true)
  };

  /**
   * Fetches a comprehensive list of unique cuisines from our DB 
   * @return {Array} an array of unique cuisines
   */
  async function fetchCuisines() {
    try {
      let response = await (
        await fetch("/api/search/restaurant/cuisines")
      ).json();
      let cuisinesArr = ["All cuisines"];

      for (let cuisine of response.cuisines) {
        cuisinesArr.push(cuisine);
      }
      return cuisinesArr;
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmitSearch(event) {
    event.preventDefault();
    let name = event.target.elements.restaurantSearchBar.value;
    name = name.replaceAll("'", "''");
    console.log('name string:', name);
    // searchRestaurantsByName(name);
    history.push(`/search/restaurant?name=${name}`)
  }

  function handleSelectCuisine(event) {
    let cuisine = event.target.value;
    // searchRestaurantsByCuisine(cuisine);
    history.push(`/search/restaurant?cuisine=${cuisine}`)
  }

  React.useEffect(async () => {
    // get list of unique quisines available from our DB
    let cuisinesArr = await fetchCuisines();
    setCuisines(cuisinesArr);
    let cookies = document.cookie.split('=');
    if (cookies.includes('account_id')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Container className="sticky-top" style={{ backgroundColor: "#2A9D8F" }} fluid>
      <Row >
        <Col xs={2} sm={1} className="align-self-end">
          <Link to="/">
            <Image src={hermesLogo} height="75px" width="75px" />
          </Link>
        </Col>

        <Col xs={2} sm={2} className="align-self-end">
          <Link to="/">
            <span
              style={{
                fontSize: "50px",
                fontFamily: "Open Sans",
                color: "white",
                WebkitTextStroke: "1px F8F8F8",
                textShadow: "0px 1px 4px #23430C"
              }}
            >Hermes</span>
          </Link>
        </Col>
        <Col sm={7} className="align-self-center mt-2">
          {/* Search bar */}
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
                    >
                      {cuisines.map((cuisine, index) => {
                        return <option key={index}>{cuisine}</option>;
                      })}
                    </Form.Control>
                  </InputGroup.Prepend>

                  {/* Restaurant search bar (must match alphanumeric and can contain apostrophes */}
                  <FormControl
                    name="restaurantSearchBar"
                    placeholder="Enter a restaurant's name"
                    maxLength="40"
                    pattern="^[A-Za-z0-9']*$"
                  />

                  {/* Submit search (button) */}
                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary bg-light"
                      type="submit"
                    >
                      Go
                  </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Row>
          </Form>
        </Col>
        <Col sm={2} className="align-self-center">
          {/* Login button - conditionally rendered */}
          {
            !isLoggedIn &&
            <React.Fragment>
              <LoginModal showState={showLoginModal} handleClose={handleCloseLoginModal} setIsLoggedIn={setIsLoggedIn} />
              <Button variant="light" onClick={handleShowLoginModal} > Login </Button>
            </React.Fragment>
          }
          {/* Menu dropdown - conditionally rendered */}
          {
            isLoggedIn &&
            <Row className="">
              <ShoppingCart
                showState={showCartModal}
                handleClose={handleCloseCartModal}
                cartItems={cartItems}
                cartTotal={cartTotal}
              />
              <Button
                variant="light"
                className="mr-3"
                onClick={handleShowCartModal}
              >Cart
              </Button>

              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Menu
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item >Account</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => handleLogout(e)}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Row>
          }
        </Col>
      </Row >

      {!isLoggedIn &&
        <Row className="text-center text-white">
          <Col><Link style={{ color: "inherit" }} to="/about-us">About Us</Link></Col>
          <Col><Link style={{ color: "inherit" }} to="/customer-registration">SFSU Customer</Link></Col>
          <Col><Link style={{ color: "inherit" }} to="driver-registration">Driver</Link></Col>
          <Col><Link style={{ color: "inherit" }} to="restaurant-registration">Restaurant Owner</Link></Col>
        </Row>}


    </Container >

  )
}

export default Navigation;
