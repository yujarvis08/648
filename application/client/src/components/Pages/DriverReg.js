import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const DriverRegistration = () => {
  const [restaurants, setRestaurants] = React.useState([]);

  async function fetchRestaurants() {
    try {
      let response = await (
        await fetch("/api/search/restaurant/restaurants")
      ).json();
      let restaurantsArr = ["All restaurants"];

      for (let restaurant of response.restaurants)
        restaurantsArr.push(restaurant.name);

      return restaurantsArr;
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    fetchRestaurants().then(setRestaurants).catch(console.log);
  }, []);
  return (
    <Container>
      <Row className="mt-5 justify-content-around">
        <h1>Driver Registration</h1>
      </Row>

      <Form className="mb-5">
        <br></br>
        <br></br>
        <br></br>
        <h3>Account Info</h3>

        {/* Registration Form */}

        <Form.Row>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="firstname"
            placeholder="First Name"
            required="true"
          />
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastname"
            placeholder="Last Name"
            required="true"
          />
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            pattern=".+@.+.com|.+@.+.net"
          />
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required="true"
          />
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Row>
        <br></br>
        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Which restaurant do you work for?</Form.Label>
          <Form.Control required="true" as="select" size="sm" custom>
            {restaurants.map((restaurant, index) => {
              return <option key={index}>{restaurant}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <br></br>

        <Form.Text>
          I agree to the <a href="/terms-of-use">Terms of Use</a>{" "}
          <input type="checkbox" required="true" />
        </Form.Text>
        <br></br>
        <br></br>
        <Button variant="primary" type="submit">
          Finish
        </Button>
      </Form>
      <hr />
    </Container>
  );
};

export default DriverRegistration;
