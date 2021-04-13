import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Checkout = () => {

  return (
    <Form>
      <br></br>
      <br></br>
      <br></br>
      <h3>Checkout</h3>

      {/* Registration Form */}

      <Form.Row>
        <Form.Label>Address-1</Form.Label>
        <Form.Control type="Adress-line1" placeholder="Address line 2: " />
      </Form.Row>
      <br></br>
      <Form.Row>
        <Form.Label>Address-2</Form.Label>
        <Form.Control type="Adress-line2" placeholder="Adress line 2: " />
      </Form.Row>
      <br></br>
      <Form.Row>
        <Form.Label>City</Form.Label>
        <Form.Control type="City" placeholder="City: " />
      </Form.Row>
      <br></br>
      <Form.Row>
        <Form.Label>State</Form.Label>
        <Form.Control type="State" placeholder="State: " />
      </Form.Row>
      <br></br>
      <Form.Row>
        <Form.Label>Zipcode</Form.Label>
        <Form.Control type="Zip" placeholder="Zipcode: " />
      </Form.Row>
      <br></br>
      <Form.Row>
        <Form.Label>Instructions</Form.Label>
        <Form.Control type="Instructions" placeholder="Exact delivery instructions(room,area,field,etc): " />
      </Form.Row>
      <Form.Row>
        <Button>Back</Button>
      </Form.Row>
    </Form>
  );
};

export default Checkout;