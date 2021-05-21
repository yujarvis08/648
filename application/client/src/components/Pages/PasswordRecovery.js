import React from "react";
import { useHistory } from "react-router-dom";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/Container";

const PasswordRecovery = () => {
  const [validated, setValidated] = React.useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation();
    const form = e.currentTarget;
    let email = form.email.value;
    if (email) {
      alert('Email has been sent. You might have to check your spam folder.');
      history.push("/");
    }
    setValidated(true);
  }

  return (
    <Container>
      <h1 className="pt-3">Password Recovery</h1>
      <hr />
      <p>Enter your email address. We'll send you a link to reset your password.</p>
      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Form.Group as={Col} md="5" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" name="email" required />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
      </Button>
      </Form>
      <br className="m-5" />
      <br className="m-5" />
      <br className="m-5" />
      <br className="m-5" />
    </Container>
  );
};
export default PasswordRecovery;
