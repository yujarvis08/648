import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AccountInfo = () => {
  return (
    <Container>
      <Row className="justify-content-around">
      </Row>
      <Row className="justify-content-around"><h1></h1></Row>
      <Form style={{ textAlign: "left" }}>
        <br></br>
        <br></br>
        <br></br>
        <h3>Account Info</h3>
        <br></br>

        <Form.Row>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="firstname" placeholder="First Name" />
          < Button>Edit</Button>
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="lastname" placeholder="Last Name" />
          <Button>Edit</Button>
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Email</Form.Label>
          <Form.Control type="Email" placeholder="Email" />
          <Button>Edit</Button>
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Password</Form.Label>
          <Form.Control type="Password" placeholder="Password" />
          <Button>Edit</Button>
        </Form.Row>
        <br></br>
      </Form>
    </Container>
  )
}

export default AccountInfo;
