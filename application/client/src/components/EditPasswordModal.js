import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditPasswordModal = ({ showState, handleClose }) => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const passwordData = {
      email: form.email.value,
      password: form.password.value,
      newPassword: form.newPassword.value
    };
    
      let wrappedResponse = await fetch("/api/accountInfo/changePassword", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordData), // body data type must match "Content-Type" header
    });
    let response = await wrappedResponse.json();

      if (wrappedResponse.ok) {
        alert(`${response.msg}`);
      } else {
        alert(`Password change failed." ${response.msg}`);
      }
  }
  return (
    <Modal show={showState} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
          <Form.Control
              type="email"
              placeholder="Enter Current Email"
              pattern=".+@sfsu.edu|.+@.+sfsu.edu|.+@.+.com"
              name="email"
            />
            <br></br>
          <Form.Control type="password" placeholder="Enter Current Password" name="password"/>
            <Form.Control.Feedback type="invalid">
              Your Password is not correct.
            </Form.Control.Feedback>
            <br></br>
            <Form.Control type="password" placeholder="Enter New Password" name="newPassword" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="secondary mr-5" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary ml-5" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPasswordModal;
