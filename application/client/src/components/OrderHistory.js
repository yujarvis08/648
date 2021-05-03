import React from "react";
// import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const OrderHistory = () => {
  return (
    <Container>
      <Row className="justify-contnet-center">
        <h1> Order History</h1>
      </Row>
      <Row>
        <Col>Restaurant Name </Col>
        <Col>Customer Name </Col>
        <Col>Date</Col>
        <Col>Time </Col>
        <Col>Order Number</Col>
      </Row>
      <Row>
        <Col>Restaurant Address </Col>
        <Col>Customer Address </Col>
      </Row>
      {/* I need to create a line that divides the info  */}
      <Row>
        <Col>Qty </Col>
        <Col>Item Name </Col>
        <Col>Price </Col>
      </Row>
      <Row>
        <Col>Qty </Col>
        <Col>Item Name </Col>
        <Col>Price </Col>
      </Row>
      <Row>
        <Col>Qty </Col>
        <Col>Item Name </Col>
        <Col>Price </Col>
        <Col>Total </Col>
      </Row>
      {/* this is where the new order should appear */}
      <Row>
        <Col>Restaurant Name </Col>
        <Col>Customer Name </Col>
        <Col>Date</Col>
        <Col>Time </Col>
        <Col>Order Number</Col>
      </Row>
      <Row>
        <Col>Restaurant Address </Col>
        <Col>Customer Address </Col>
      </Row>
      {/* I need to create a line that divides the info  */}

      <Row>
        <Col>Qty </Col>
        <Col>Item Name </Col>
        <Col>Price </Col>
      </Row>
      <Row>
        <Col>Qty </Col>
        <Col>Item Name </Col>
        <Col>Price </Col>
      </Row>
      <Row>
        <Col>Qty </Col>
        <Col>Item Name </Col>
        <Col>Price </Col>
        <Col>Total </Col>
      </Row>
    </Container>
  );
};
export default OrderHistory;
