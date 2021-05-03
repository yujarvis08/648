import React from "react";
import "react-tabs/style/react-tabs.css";
// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// components
import MenuItemModal from "./MenuItemModal";

const Resturantmenu = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    console.log('event data:', e);
    console.log('children:', e.target.childNodes)
    console.log('name:', e.target.childNodes.innerText)
    // console.log('description:', e.target.childNodes[1].childNodes[0].innerText)
    // console.log('price:', e.target.childNodes[1].childNodes[1].innerText)
    console.log('price:', e.target.innerText)
    setShow(true)
  };
  const menuItemData = { name: "pork chop", price: "2.99" };
  // grab restaurant name from url.
  // url should be something like /RestaurantMenu?name=<restaurant name>
  // using the restauran's name (gotten from url), do a fetch request to get restaurant data
  // so we can dispaly the restaurant's description

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

  const menuItems = menuItemsTestData.map((item, i) => {
    return (
      <Card
        className="m-5"
        style={{ width: '18rem' }}
        key={i}
        onClick={handleShow}
      >
        <Card.Body>
          <Card.Title>{`${item.name}`}</Card.Title>
          {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
          <Card.Text>
            <p>{`${item.description}`}</p>
            <p>{`$${item.price}`}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  })

  return (
    <Container className="bg-white m-5">
      <MenuItemModal showState={show} handleClose={handleClose} menuItem={menuItemData} />
      <Row>
        <Col><h1>Restaurant Name</h1></Col>
      </Row>
      <Row>
        <Col><h2>Restaurant Description</h2></Col>
      </Row>
      <Row className="justify-content-center mt-5 mb-5">
        {menuItems}
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
