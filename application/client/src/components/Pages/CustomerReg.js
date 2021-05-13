import React from "react";
import { useHistory } from "react-router-dom";
// Bootstrap
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
// components
import AccountInfoForm from "../AccountInfoForm";


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

    let response = await wrappedResponse.json();

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
        <AccountInfoForm accountType="customer" />
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
