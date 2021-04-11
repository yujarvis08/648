import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const RestaurantRegistration = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Form style={{ textAlign: "left" }}>
      <br></br>
      <br></br>
      <br></br>
      <h3>Account Info</h3>

      {/* Login modal if user already has account */}
      <Form.Text>
        Already have an Account?{" "}
        <Link
          variant="primary"
          onClick={handleShow}
          style={{
            textDecoration: "underline",
            color: "black",
          }}
        >
          Click Here
        </Link>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
                <Form.Text>
                  Forgot Password? <a href="/">Click Here</a>
                </Form.Text>
                <Form.Text>
                  Don't Have an Account?{" "}
                  <a href="/userRegistration">Click Here</a>
                </Form.Text>
              </Form.Group>

              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "325px" }}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Form.Text>
      <br></br>

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
