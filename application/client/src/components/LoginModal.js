import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginModal = () => {
    const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
        
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
      </Modal>)
}

export default LoginModal;