import React from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";


const AccountInfoForm = ({ accountType }) => {
    return (
        <React.Fragment>
            <h3>Account Information</h3>
            <p className="text-danger" >All fields are required unless noted as optional</p>
            <br />
            {/* Registration Form */}

            <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="First Name"
                    required
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
                    required
                    name="lastName"
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid last name
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                {accountType === "customer"
                    ? (<Form.Control type="email"
                        name="email"
                        placeholder="Email"
                        pattern=".+@sfsu.edu|.+@.+sfsu.edu"
                        required
                    />)
                    : (<Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />)}
                <Form.Control.Feedback type="invalid">
                    Please provide a valid email
          </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    required
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
        </React.Fragment>
    )
}

export default AccountInfoForm;