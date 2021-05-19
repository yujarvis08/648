import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditEmailModal = ({ showState, handleClose, userType }) => {
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const emailData = {
      oldEmail: form.email.value,
      newEmail: form.newEmail.value
    };
    
      let wrappedResponse = await fetch("/api/accountInfo/changeEmail", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData), // body data type must match "Content-Type" header
    });
    let response = await wrappedResponse.json();

      if (wrappedResponse.ok) {
        alert(`${response.msg}`);
      } else {
        alert(`Email change failed. ${response.msg}`);
      }
  }

  return (
    <Modal show={showState} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Email Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {(userType === "customer") 
          ? 
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter Current Email"
              pattern=".+@sfsu.edu|.+@.+sfsu.edu"
              name="email"
            />
            <br></br>
            <Form.Control
              type="email"
              placeholder="Enter New Email"
              pattern=".+@sfsu.edu|.+@.+sfsu.edu"
              name="newEmail"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
            :
           <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter Current Email"
              pattern=".+@.+.com|.+@.+.net"
              name="email"
            />
            <br></br>
            <Form.Control
              type="email"
              placeholder="Enter New Email"
              pattern=".+@.+.com|.+@.+.net"
              name="newEmail"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          }

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

export default EditEmailModal;
