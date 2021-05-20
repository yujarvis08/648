import React from "react";
import { useLocation } from 'react-router-dom';
import SearchAPI from '../../api/search.js';
import MenuAPI from '../../api/menu.js';
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// components
// import MenuItemModal from "../MenuItemModal";
import LoginModal from "../LoginModal";

/**
 * This component displays the restaurant's menu items.
 * It is also in charge of displaying the MenuItemModal.
 * It renders when the url is: /restaurant-menu?name=<restaurant name>
 */
const ResturantMenu = ({ isLoggedIn }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [menuItems, setMenuItems] = React.useState([]);
  // const [selectedMenuItem, setSelectedMenuItem] = React.useState({ name: "", price: 0.00 });
  // const [quantity, setQuantity] = React.useState(0);
  // const [total, setTotal] = React.useState(0.00);
  const [menuItems, setMenuItems] = React.useState([]);
  const query = new URLSearchParams(useLocation().search);
  const [restaurant, setRestaurant] = React.useState({
    name: "",
    priceRating: "",
    cuisine: "",
    description: "",
    address: {},
    imagePath: ""
  });

  /**
   * When the user clicks away from the MenuItem modal, this function
   * is triggered. This sets the quantity and total back to zero so that
   * the next item selected starts at zero as well.
   */
  // const handleClose = () => {
  //   setQuantity(0);
  //   setTotal(0.00);
  //   setShow(false);
  // }

  /**
   * Triggered "on click". It gets the menu item name and price from the
   * html element and updates the selectedMenuItem state variable before
   * toggling the show state for the MenuItem modal so that it pops up.
   * @param {object} e 
   */
  // const handleShow = (e) => {
  //   let itemName = e.currentTarget.getAttribute("item-name");
  //   let itemPrice = e.currentTarget.getAttribute("item-price");
  //   let newMenuItem = { name: itemName, price: itemPrice }
  //   setSelectedMenuItem(newMenuItem)
  //   setShow(true)
  // };

  async function handleAddRemove(e) {
    if (!isLoggedIn) {
      handleShow();
      return
    }

    let option = e.target.value;
    let menuItemId = e.currentTarget.getAttribute("item-id");

    if (option === "add") {
      fetch('/api/shoppingCart/addItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuItemId })
      })

    } else if (option === "remove") {
      fetch('/api/shoppingCart/deleteItem', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuItemId })
      });

    } else {
      console.log('Error in button value');
    }
  }

  /**
   * On mount, this hook gets the selected restaurant's name from the URI,
   * then it uses the Search API to fetch the restaurant's data and saves
   * it into the restaurant state variable.
   */
  React.useEffect(async () => {
    let restaurantName = decodeURIComponent(query.get('name'));
    let response = await SearchAPI.searchRestaurantsByName(restaurantName);
    console.log('response in RestaurantMenu:', response)
    let rest;
    if (response.restaurants) {
      rest = response.restaurants[0];
      setRestaurant(rest);
    }

    let menuItemsResponse = await MenuAPI.getMenuItems(rest.restaurantId);
    setMenuItems(menuItemsResponse);
  }, [])
  console.log('restaurant', restaurant)
  return (
    <Container className="bg-white p-5">
      {/* <MenuItemModal
        showState={show}
        handleClose={handleClose}
        quantity={quantity}
        setQuantity={setQuantity}
        total={total}
        setTotal={setTotal}
        menuItem={selectedMenuItem} /> */}
      <Row>
        <Col sm={6}>
          <h1>{restaurant.name}</h1>
          <h2>{restaurant.description}</h2>
          <p>{restaurant.address.line1}, {restaurant.address.city}, {restaurant.address.state}, {restaurant.address.zipcode}</p>
          <p>Price rating: {restaurant.priceRating}</p>
        </Col>
        <Col >
          Google Map Goes Here
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center mt-3 mb-3">
        {menuItems.map((item, i) => {
          return (
            <Card
              className="m-3"
              style={{ width: '18rem', boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
              key={item.menuItemId}
              // onClick={handleShow}
              item-name={item.name}
              item-price={item.price}
            >
              <Card.Body >
                <Card.Title>{item.name}</Card.Title>
                <p>{item.description}</p>
                <p>${item.price}</p>
                <Row>
                  <Col>
                    <Button
                      value="add"
                      item-id={item.menuItemId}
                      onClick={handleAddRemove}>
                      Add
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      value="remove"
                      item-id={item.menuItemId}
                      onClick={handleAddRemove}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )
        })}
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container >
  );
};

export default ResturantMenu;
