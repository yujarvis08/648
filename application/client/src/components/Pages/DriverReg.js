import React from "react";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const DriverRegistration = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    let match = form.confirmPassword.value === form.password.value ? "" : "Passwords must match!";
    form.confirmPassword.setCustomValidity(match);

    setValidated(true);
    if (form.checkValidity() === false) {
      // if form is not valid, don't do anything
      return
    }
  };

  async function fetchRestaurants() {
    try {
      let response = await (
        await fetch("/api/search/restaurant/restaurants")
      ).json();
      let restaurantsArr = [];

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
      <hr />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <br></br>
        <h3>Account Info</h3>
        <p className="text-danger" >* All fields are required unless noted as optional</p>
        <br></br>

        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            required="true"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid first name
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastname"
            placeholder="Last Name"
            required="true"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            pattern=".+@.+.com|.+@.+.net"
            required="true"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required="true"
            maxLength="20"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            name="password"
          />
          <Form.Text muted>Password must be 8-20 characters long and contain
             at least 1 number, 1 uppercase, and 1 lowercase letter.</Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" />
          <Form.Control.Feedback type="invalid">
            Passwords must match
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Which restaurant do you work for?</Form.Label>
          <Form.Control as="select" size="sm" custom required>
            <option value="">Choose restaurant</option>

            {restaurants.map((restaurant, index) => {
              return <option key={index}>{restaurant}</option>;
            })}
            <Form.Control.Feedback type="invalid">
              Please select the restaurant you work for
          </Form.Control.Feedback>
          </Form.Control>
        </Form.Group>
        <br></br>

        <Form.Group >
          <input type="checkbox" className="ml-3" required />{" "}
          I agree to the <a href="/terms-of-use">Terms of Use</a>
          <Form.Control.Feedback type="invalid">
            You must agree before submitting
          </Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <br></br>
        <Form.Row >
          <Button className="ml-3" variant="primary" type="submit">
            Submit
        </Button>
        </Form.Row>
      </Form>
      <hr />
    </Container>
  );
};

export default DriverRegistration;
