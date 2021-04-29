import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


const DriverRegistration = () => {

  return (
    <Container>
      <Row className="mt-5 justify-content-around"><h1>Driver Registration</h1></Row>

      <Form className="mb-5">
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
        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
          <Form.Label>Which restaurant do you work for?</Form.Label>
          <Form.Control as="select" size="sm" custom>
            <option>Bob's Burgers</option>
            <option>Infinite Tacos</option>
            <option>Pizzarino</option>
            <option>Brain Freeze</option>
            <option>Dynamic Coffee</option>
          </Form.Control>
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit">Finish</Button>
      </Form>
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

export default DriverRegistration;
