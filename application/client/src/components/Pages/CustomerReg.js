import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const UserRegistration = () => {
  const [validated, setValidated] = React.useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;

    let match = form.confirmPassword.value === form.password.value ? "" : "Passwords must match!";
    form.confirmPassword.setCustomValidity(match);

    setValidated(true);
    if (form.checkValidity() === false) {
      // if form is not valid, don't do anything
      return
    }

    const regData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      password: form.password.value,
    };

    let wrappedResponse = await fetch("/api/registration/customer", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData), // body data type must match "Content-Type" header
    });
    console.log("wrapped response:", wrappedResponse);

    let response = await wrappedResponse.json();
    // console.log('Response from registering customer:', response);
    if (wrappedResponse.ok) {
      alert("You've been registered! Login at the homepage.");
      history.push("/");
    } else {
      alert(`Registration failed. ${response.msg}`);
    }
  }

  return (
    <Container>
      <Row className="mt-5 justify-content-around">
        <h1>Customer Registration</h1>
      </Row>
      <hr />
      <Form noValidate validated={validated} onSubmit={handleSubmit} >
        <br></br>
        <h3>Account Information</h3>
        <p className="text-danger" >All fields are required unless noted as optional</p>
        <br></br>

        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            required="true"
            name="firstName"
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
            name="lastName"
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
            pattern=".+@sfsu.edu|.+@.+sfsu.edu"
            required="true"
            name="email"
          />
          <Form.Text muted>Must be an SFSU email</Form.Text>
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
        <br />
        <Form.Group>
          <input type="checkbox" className="ml-3" required />{" "}
          I agree to the <a href="/terms-of-use">Terms of Use</a>
          <Form.Control.Feedback type="invalid">
            You must agree before submitting
          </Form.Control.Feedback>
        </Form.Group>

        <br></br>
        <br></br>

        <Form.Row >
          <Button variant="primary" type="submit" className="ml-3">Submit</Button>
        </Form.Row>

        <br></br>
      </Form>
      <hr />
      <br />
      <br />
    </Container>
  );
};

export default UserRegistration;
