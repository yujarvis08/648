import React from "react";
import { useHistory } from "react-router-dom";
import SearchAPI from "../../api/search";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// components
import AccountInfoFrom from "../AccountInfoForm";


const DriverRegistration = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [validated, setValidated] = React.useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    let match = form.confirmPassword.value === form.password.value ? "" : "Passwords must match!";
    form.confirmPassword.setCustomValidity(match);

    setValidated(true);
    if (form.checkValidity() === true) {
      // if form is valid, submit data to endpoint
      const regData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        password: form.password.value,
        restaurantId: form.restaurant.value
      };

      let wrappedResponse = await fetch("/api/registration/driver", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData), // body data type must match "Content-Type" header
      });

      let response = await wrappedResponse.json();

      if (wrappedResponse.ok) {
        alert("You've been registered! Login at the homepage.");
        history.push("/");
      } else {
        alert(`Registration failed. ${response.msg}`);
      }

    }
  };

  React.useEffect(() => {
    SearchAPI.getRestaurants()
      .then(setRestaurants)
      .catch(console.log);
  }, []);

  return (
    <Container>
      <Row className="mt-5 justify-content-around">
        <h1>Driver Registration</h1>
      </Row>
      <hr />

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <br></br>
        <AccountInfoFrom />

        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Which restaurant do you work for?</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            name="restaurant"
            custom
            required
          // onChange={handleRestaurantChange}
          >
            <option value="">Choose restaurant</option>

            {restaurants.map((restaurant, index) => {
              return <option
                value={restaurant.restaurantId}
                key={restaurant.restaurantId}
              >
                {restaurant.name}
              </option>;
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
