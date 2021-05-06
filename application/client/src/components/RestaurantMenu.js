import React from "react";
import { useLocation } from 'react-router-dom';
import SearchAPI from '../api/search.js';
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// components
import MenuItemModal from "./MenuItemModal";

/**
 * TODO: Fetch restaurant menu items from DB
 * TODO: Create function for handling adding items to shopping cart in DB
 */
/**
 * This component displays the restaurant's menu items.
 * It is also in charge of displaying the MenuItemModal.
 * It renders when the url is: /restaurant-menu?name=<restaurant name>
 * Devs: Amit, Roberto
 */
const Resturantmenu = () => {
  const [show, setShow] = React.useState(false);
  // const [menuItems, setMenuItems] = React.useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState({ name: "", price: 0.00 });
  const [quantity, setQuantity] = React.useState(0);
  const [total, setTotal] = React.useState(0.00);
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
  const handleClose = () => {
    setQuantity(0);
    setTotal(0.00);
    setShow(false);
  }

  /**
   * Triggered "on click". It gets the menu item name and price from the
   * html element and updates the selectedMenuItem state variable before
   * toggling the show state for the MenuItem modal so that it pops up.
   * @param {object} e 
   */
  const handleShow = (e) => {
    let itemName = e.currentTarget.getAttribute("item-name");
    let itemPrice = e.currentTarget.getAttribute("item-price");
    let newMenuItem = { name: itemName, price: itemPrice }
    setSelectedMenuItem(newMenuItem)
    setShow(true)
  };

  // Dummy data
  const menuItemsTestData = [
    {
      name: "pork chop",
      price: 2.00,
      description: "delicious pork chops"
    },
    {
      name: "apple pie",
      price: 3.22,
      description: "just like mom makes them"
    },
    {
      name: "fried chicken",
      price: 5.99,
      description: "spicy fried chicken better than KFC"
    },
    {
      name: "soda",
      price: 1.00,
      description: "coke, sprite, fanta"
    }
  ]

  /**
   * On mount, this hook gets the selected restaurant's name from the URI,
   * then it uses the Search API to fetch the restaurant's data and saves
   * it into the restaurant state variable.
   */
  React.useEffect(async () => {
    let restaurantName = decodeURIComponent(query.get('name'));
    let response = await SearchAPI.searchRestaurantsByName(restaurantName);
    if (response.restaurants) {
      setRestaurant(response.restaurants[0]);
    }
  }, [])

  /**
   * When the quantity changes, this hook recalculates the new total
   */
  React.useEffect(() => {
    let newTotal = quantity * selectedMenuItem.price;
    if (newTotal < 0) {
      newTotal = 0;
    }
    setTotal(newTotal.toFixed(2));
  }, [quantity]);

  return (
    <Container className="bg-white m-5">
      <MenuItemModal
        showState={show}
        handleClose={handleClose}
        quantity={quantity}
        setQuantity={setQuantity}
        total={total}
        setTotal={setTotal}
        menuItem={selectedMenuItem} />
      <Row>
        <Col><h1>{`${restaurant.name}`}</h1></Col>
      </Row>
      <Row>
        <Col><h2>{`${restaurant.description}`}</h2></Col>
      </Row>
      <Row className="justify-content-center mt-5 mb-5">
        {menuItemsTestData.map((item, i) => {
          return (
            <Card
              className="m-5"
              style={{ width: '18rem' }}
              key={i}
              onClick={handleShow}
              item-name={item.name}
              item-price={item.price}
            >
              <Card.Body>
                <Card.Title>{`${item.name}`}</Card.Title>
                <p>{`${item.description}`}</p>
                <p>{`$${item.price}`}</p>
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
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

export default Resturantmenu;
