import React from 'react';
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AddItemModal from "../AddItemModal";
const Restaurant = () => {
  const [validated, setValidated] = React.useState(false);
  const [numItems, setNumItems] = React.useState(1);
  const [menuItems, setMenuItems] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /**
     * Appends a new menu item card into our registration form
     * It works by deep-cloning a menuItem Card element, cleaning it,
     * and appending it to a parent node.
     * Bad think about this function is that it's very sensitive to new
     * additions to the menuItem Card element due to the child indexes.
     * @param
     */
  function addMenuItem() {
    let parentNode = document.getElementById("menuItemsRow");
    let newNode = document.getElementsByName("menuItem")[0].cloneNode(true);
    // reset the values for the new node
    newNode.childNodes[0].childNodes[0].childNodes[1].value = ''; // item name
    newNode.childNodes[0].childNodes[1].childNodes[1].value = ''; // item description
    newNode.childNodes[0].childNodes[3].childNodes[1].value = ''; // item price
    // add event listener (cloneNode deep copy doesn't clone event listeners)
    newNode.childNodes[0].childNodes[3].childNodes[3].addEventListener('click', removeMenuItem);
    // remove disabled attribute from button for the case when we clone from an item with it disabled
    newNode.childNodes[0].childNodes[3].childNodes[3].removeAttribute("disabled");
    parentNode.appendChild(newNode);
    setNumItems(numItems + 1);
  }

  /**
   * Removes the menu item Card from the registration form
   * It works by clicking on a remove button within the Card element
   * @param {Event} e 
   */
  async function removeMenuItem(e) {
    // console.log(e.currentTarget.parentNode.parentNode.parentNode)
    // e.currentTarget.parentNode.parentNode.parentNode.remove();
    // setNumItems(numItems - 1);
    let menuItemId = e.target.getAttribute('menu-item-id');
    console.log('menuItemId:', menuItemId);
    await fetch(`/api/restaurant/removeMenuItem/${menuItemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    let menuItemsRes = await getMenuItems();
    setMenuItems(menuItemsRes);
  }
  async function getMenuItems() {
    let result = await (await fetch('/api/restaurant/menuItems')).json();
    return result.menuItems;
  }

  React.useState(async () => {
    let menuItemsRes = await getMenuItems();
    console.log('menuItems in restaurant:', menuItemsRes);
    setMenuItems(menuItemsRes);
  }, []);

  return (
    <Container>
      <h1 className="mt-3">Restaurant Menu</h1>
      Add or remove items to your restaurant's menu.
      <hr />
      <br></br>
      <AddItemModal showState={show} handleClose={handleClose} setMenuItems={setMenuItems} />
      <Form>
        <Form.Row id="menuItemsRow">
          {menuItems.map((menuItem, i) => {
            return (
              <Card
                className="m-3"
                style={{ width: '25rem', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
                name="menuItem"
                key={menuItem.menuItemId}
              >
                <Card.Body>
                  <Form.Group>
                    <Form.Label>Item name:</Form.Label>
                    <Form.Control placeholder="Spaghetti Pomodoro" name="itemName" required value={menuItem.name}></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="itemDescription"
                      required
                      placeholder="Spaghetti pasta cooked al dente with tomatoes, fresh basil, garlic, and olive oil" value={menuItem.description}></Form.Control>
                  </Form.Group>
                  <Form.Label>Price</Form.Label>
                  <InputGroup className="p-0">
                    <InputGroup.Prepend>
                      <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control placeholder="0.00" name="itemPrice" value={menuItem.price} required ></Form.Control>
                    <div name="spacer" className="col md-6"></div>
                    <Button variant="danger" menu-item-id={menuItem.menuItemId} onClick={(e) => removeMenuItem(e)}>Remove</Button>
                  </InputGroup>
                </Card.Body>
              </Card>
            )
          })
          }
        </Form.Row>
        <Button
          className="m-3"
          id="addMenuItemBtn"
          onClick={handleShow}
        >Add another menu item</Button>
      </Form>
    </Container>
  )
}

export default Restaurant;