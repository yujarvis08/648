import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Checkout = () => {

  return (
    <Container>
      <Row>
        <Col>
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
        </Col>
        <Col>
          <h3>Order Details</h3>
          <Form.Row>
              <Form.Label></Form.Label>
              <Form.Control type="Item name 1: " placeholder="Item Name 1:                       price:  $ " />
              </Form.Row>
              <Form.Row>
              <Form.Label></Form.Label>
              <Form.Control type="Item name 2: " placeholder="Item Name 2:                       price:  $ " />
              </Form.Row>
              <Form.Row>
              <Form.Label></Form.Label>
              <Form.Control type="Item name 3: " placeholder="Item Name 3:                       price:  $ " />
              </Form.Row>
              <Form.Row>
              <Form.Label></Form.Label>
              <Form.Control type="Total Cost: $ " placeholder="Total Cost: $  "/>
              </Form.Row>
              <Form.Row>
              <Form.Label></Form.Label>
              <Form.Control type="EST-Time" placeholder="Estimate Delivery Time:  "/>
              </Form.Row>
              <Form.Row>
              <Button>Place Order</Button>
            </Form.Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;

