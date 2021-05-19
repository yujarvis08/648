import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import EditEmailModal from "./EditEmailModal";
import EditPasswordModal from "./EditPasswordModal";

const AccountInfo = () => {
  const [showEmail, setShowEmail] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [userType, setUserType] = React.useState('');
  const handleCloseEmail = () => setShowEmail(false);
  const handleShowEmail = () => setShowEmail(true);
  const handleClosePassword = () => setShowPassword(false);
  const handleShowPassword = () => setShowPassword(true);

  React.useEffect(async () => {
    let response = await (await fetch('/api/accountInfo/email')).json();
    setEmail(response.email);
    response = await fetch('/api/accountInfo/getUserType');
    response = await response.json();
    setUserType(response.userType);
  }, []);
  


  return (
    <Container style={{ height: "100%" }}>
      <br></br>
      <br></br>
      <br></br>
      <h1>Account Settings</h1>
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
        <br></br>

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
        </Form.Group>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Form>
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
