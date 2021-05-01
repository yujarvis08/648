import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const UserRegistration = () => {

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    const regData = {
      firstName,
      lastName,
      email,
      password
    }

    let wrappedResponse = await fetch('/api/registration/customer', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regData) // body data type must match "Content-Type" header
    });
    console.log('wrapped response:', wrappedResponse);

    let response = await wrappedResponse.json();
    // console.log('Response from registering customer:', response);
    if (wrappedResponse.ok) {
      alert("You've been registered! Login at the homepage.")
      history.push('/');
    } else {
      alert(`Registration failed. ${response.msg}`);
    }
  }


  return (
    <Container>
      <Row className="mt-5 justify-content-around"><h1>Customer Registration</h1></Row>
      <Form style={{ textAlign: "left" }} onSubmit={(e) => handleSubmit(e)}>
        <br></br>
        <br></br>
        <br></br>
        <h3>Account Info</h3>
        <br></br>

        <Form.Row>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="firstname" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="lastname" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  pattern=".+@sfsu.edu|.+@.+sfsu.edu" onChange={(e) => setEmail(e.target.value)} />
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Row>
        <br></br>
        <Form.Row>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
        </Form.Row>
        <br></br>

        <Link to="/" className="btn btn-secondary">Back</Link>

        <Button variant="primary" type="submit" style={{ marginLeft: '50px' }}>
          Finish
            </Button>
        <br></br>
      </Form>
      <br />
      <br />
      <br />
      <br />
    </Container>


  )
}

export default UserRegistration;