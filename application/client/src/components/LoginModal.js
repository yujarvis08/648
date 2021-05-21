import React from 'react';
import { useHistory } from "react-router-dom";
// Bootstrap
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const LoginModal = ({ showState, handleClose, handleLogin }) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let loginData = { email, password }

        let response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData) // body data type must match "Content-Type" header)
        });
        let responseJSON = await response.json();

        console.log("Response from login:", responseJSON);
        if (response.ok) {
            handleLogin();
            handleClose();
            let url = window.location.href;
            if (!url.includes("restaurant-menu")) {
                history.push('/');
            }
        } else {
            alert(`Wrong username or password.`);
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
                            Forgot Password? <a href="/password-recovery">Click Here</a>
                        </Form.Text>
                        <Form.Text>
                            Don't have an account?
                            <p><a href="/customer-registration">Customer</a>
                            &nbsp;| <a href="/driver-registration">Delivery Driver</a>
                            &nbsp;| <a href="/restaurant-registration">Restaurant Owner</a>
                            </p>
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
        </Modal>
    )
}

export default LoginModal;