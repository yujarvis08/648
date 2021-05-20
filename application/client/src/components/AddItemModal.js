import React from "react";
// Bootstrap
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";

const AddItemModal = ({ showState, handleClose, setMenuItems }) => {

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    // validate password and confirm password match
    const form = e.currentTarget;
    let menuItem = {
      name: form.itemName.value,
      description: form.itemDescription.value,
      price: form.itemPrice.value,
    }
    console.log('menuItem in handle submit:', menuItem);
    await fetch('/api/restaurant/addMenuItem', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menuItem)
    });
    let result = await (await fetch('/api/restaurant/menuItems')).json();
    setMenuItems(result.menuItems);
    handleClose();
  }
  return (
    <Modal show={showState} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Card
          className="m-3"
          name="menuItem"
        >
          <Card.Body>
            <Form.Group>
              <Form.Label>Item name:</Form.Label>
              <Form.Control name="itemName" required></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                name="itemDescription"
                required
              ></Form.Control>
            </Form.Group>
            <Form.Label>Price</Form.Label>
            <InputGroup className="p-0">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control placeholder="0.00" name="itemPrice" required pattern="\d+(\.\d{1,2})?"></Form.Control>
              <div name="spacer" className="col md-6"></div>
            </InputGroup>
          </Card.Body>
          <Button type="submit">Save</Button>
        </Card>
      </Form>
    </Modal>
  )
}

export default AddItemModal;