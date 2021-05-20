import React from "react";
import { useHistory } from 'react-router-dom';
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
// Components
import EditEmailModal from "./EditEmailModal";
import EditPasswordModal from "./EditPasswordModal";

const AccountInfo = ({ handleLogout }) => {
  const [showEmail, setShowEmail] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [userType, setUserType] = React.useState('');
  const handleCloseEmail = () => setShowEmail(false);
  const handleShowEmail = () => setShowEmail(true);
  const handleClosePassword = () => setShowPassword(false);
  const handleShowPassword = () => setShowPassword(true);
  const history = useHistory();


  function handleDelete(e) {
    e.preventDefault();
    alert('Your account has been deleted.')
    handleLogout();
    history.push('/');
  }

  React.useEffect(async () => {
    let response = await (await fetch('/api/accountInfo/email')).json();
    setEmail(response.email);
    response = await fetch('/api/accountInfo/getUserType');
    response = await response.json();
    setUserType(response.userType);
  }, []);

  return (
    <Container style={{ height: "100%" }}>
      <h1 className="mt-3">Account Settings</h1>
      <p>Change your email or password.</p>
      <hr />
      <Form style={{ textAlign: "left" }} className="border" as={Col} md="6">
        <br></br>

        <Form.Group controlId="validationCustom04">
          <h5>Email Address</h5>
          <Form.Control
            className="text-dark"
            plaintext
            readOnly
            defaultValue={email}
          />
          <br></br>
          <EditEmailModal
            showState={showEmail}
            handleClose={handleCloseEmail}
            userType={userType}
          />
          <Button variant="secondary" onClick={handleShowEmail}>
            {" "}
            Edit{" "}
          </Button>
        </Form.Group>
        <hr />
        <Form.Group controlId="validationCustom04">
          <h5>Password</h5>
          <Form.Control
            type="password"
            plaintext
            readOnly
            defaultValue="secretpassword"
            name="password"
          />
          <Form.Text muted>
            Password must be 8-20 characters long and contain at least 1 number,
            1 uppercase, and 1 lowercase letter.
          </Form.Text>
          <br></br>
          <EditPasswordModal
            showState={showPassword}
            handleClose={handleClosePassword}
          />
          <Button variant="secondary" onClick={handleShowPassword}>
            {" "}
            Edit{" "}
          </Button>
          <hr />
          <h5>Delete Account</h5>
          <Form.Text>
            <b>Warning</b>: this action is irreversible and will erase all of your
            account information. Only click this button if you are sure you no longer
            want to have this account.
          </Form.Text>
          <Button variant="danger" className="mt-2" onClick={handleDelete}>Delete</Button>
        </Form.Group>
      </Form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Container>
  );
};

export default AccountInfo;
