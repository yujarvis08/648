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
// images
import hermesLogo from "./nav-hermesLogo.png";
// components
import LoginModal from './LoginModal';

// import burger from "../burger.jpg";
import food from "./nav-food.jpg";
// import food2 from "../food2.jpg";

const Navigation = ({ handleLogout, isLoggedIn, setIsLoggedIn }) => {
  const [show, setShow] = React.useState(false);
  const [cuisines, setCuisines] = React.useState([]);
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

      for (let cuisine of response.cuisines) cuisinesArr.push(cuisine.cuisine);

      return cuisinesArr;
    } catch (err) {
      console.log(err);
    }
  }

  function handleSubmitSearch(event) {
    event.preventDefault();
    let name = event.target.elements.restaurantSearchBar.value;
    // searchRestaurantsByName(name);
    history.push(`/search/restaurant?name=${name}`)
  }

  function handleSelectCuisine(event) {
    let cuisine = event.target.value;
    // searchRestaurantsByCuisine(cuisine);
    history.push(`/search/restaurant?cuisine=${cuisine}`)
  }

  React.useEffect(() => {
    // get list of unique quisines available from our DB
    fetchCuisines().then(setCuisines).catch(console.log);

    let cookies = document.cookie.split('=');
    // console.log('cookies split:', cookies);
    // console.log('includes cookie', cookies.includes('account_id'));
    if (cookies.includes('account_id')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={2} md={1} className="align-self-end">
          <Link to="/">
            <Image src={hermesLogo} height="75px" width="75px" />
          </Link>
        </Col>

        <Col xs={2}>
          <Link to="/">
            <span
              style={{
                fontSize: "50px",
                fontFamily: "Open Sans",
                color: "green",
              }}
            >Hermes</span>
          </Link>
        </Col>

        <Col md={9} className="align-self-end">
          <span
            style={{
              fontSize: "25px",
              fontFamily: "Open Sans",
              color: "black",
            }}
          > Get food delivered to SFSU campus fast!
          </span>
        </Col>

      </Row>

      {/* Background and Nav */}
      <div
        className="image"
        className="bg-dark"
        style={{
          width: "100%",
          height: "250px",
          backgroundImage: `url(${food})`,
        }}
      >
        {/* Login button */}
        {!isLoggedIn &&
          <React.Fragment>
            <LoginModal showState={show} handleClose={handleClose} setIsLoggedIn={setIsLoggedIn} />
            <Button
              variant="primary"
              onClick={handleShow}
              style={{
                // marginLeft: "1000px",
                marginTop: "15px",
                backgroundColor: "#61dafb",
                color: "black",
              }}
            >
              Login
                    </Button>
          </React.Fragment>}
        {/* Logout button */}
        {isLoggedIn &&
          <Button
            variant="primary"
            onClick={handleLogout}
            style={{
              marginTop: "15px",
              backgroundColor: "#61dafb",
              color: "black",
            }}
          >
            Logout
          </Button>}

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
    </Container >

  )
}

export default Navigation;
