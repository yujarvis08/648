import React from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const LoginModal = ({ showState, handleClose, setIsLoggedIn }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        let loginData = { email, password }
        console.log('Login data object:', loginData)

        let response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData) // body data type must match "Content-Type" header)
        });
        let responseJSON = await response.json();

        console.log("Response from login:", responseJSON);
        if (response.ok) {
            setIsLoggedIn(true);
        }
    }

    return (
        <Modal show={showState} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <Form.Text>
                            Forgot Password? <a href="/">Click Here</a>
                        </Form.Text>
                        {/*<Form.Text>
        Don't Have an Account?{" "}
        <a href="/userRegistration">Click Here</a>
      </Form.Text>*/}
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

    )
}

export default LoginModal;