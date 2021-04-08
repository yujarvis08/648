import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const userRegistration = () => {
return(
    <Container>
        <Row className="justify-content-around">
        <p>Software Engineering Class SFSU</p>
        <p>Spring 2021</p>
        <p>Section 03</p>
        <p>Team 03</p>
      </Row>

      <Row className="justify-content-around"><h1>User Registration</h1></Row>
      <Form style={{ textAlign: "left" }}>
            <br></br>
            <br></br>
            <br></br>
            <h3>Account Info</h3>
            <br></br>

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
            
            <Link to="/" className="btn btn-secondary">Back</Link>
            
            <Button variant="primary" type="submit" style={{marginLeft: '50px'}}>
              Finish
            </Button>
            <br></br>
          </Form>
    </Container>

    
)
}

export default userRegistration;