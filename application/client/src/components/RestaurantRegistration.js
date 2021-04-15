import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const RestaurantRegistration = () => {

  return (
    <Form style={{ textAlign: "left" }}>
      <br></br>
      <br></br>
      <br></br>
      <h3>Account Info</h3>

      {/* Registration Form */}
      <Form.Row>
        <Form.Label>First Name</Form.Label>
        <Form.Control type="firstname" placeholder="First Name" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="lastname" placeholder="Last Name" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" />
      </Form.Row>

      <br></br>
      <br></br>
      <br></br>
      <h3>Restaurant Info</h3>
      <br></br>

      <Form.Row>
        <Form.Label>Restaurant Name</Form.Label>
        <Form.Control placeholder="Enter the name of your Restaurant" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Add a description of your restaurant" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Label>Cuisine</Form.Label>
        <Form.Control placeholder="What cuisine do you serve?" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Group>
          <Form.Label>Menu Prices:</Form.Label>
          <Form.Check type="radio" label="$" name="option" />
          <Form.Check type="radio" label="$$" name="option" />
          <Form.Check type="radio" label="$$$" name="option" />
        </Form.Group>
      </Form.Row>

      <br></br>
      <br></br>
      <br></br>
      <h3>Restaurant Address</h3>
      <br></br>

      <Form.Row>
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Label>City</Form.Label>
        <Form.Control placeholder="City" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Label>State</Form.Label>
        <Form.Control placeholder="State" />
      </Form.Row>
      <br></br>

      <Form.Row>
        <Form.Label>Zip</Form.Label>
        <Form.Control placeholder="Zip Code" />
      </Form.Row>
      <br></br>

      <Button variant="primary" type="submit">
        Finish
      </Button>
    </Form>
  );
};

export default RestaurantRegistration;
