import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/Container";

const OrderConfirmation = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const testItems = [
    {
      name: "pork chops",
      price: 2.99,
    },
    {
      name: "steak",
      price: 10.88,
    },
    {
      name: "apple sauce",
      price: 0.99,
    },
  ];

  const itemList = testItems.map((item, i) => {
    return (
      <Row key={i}>
        <Col>
          <p>{`${item.name}`}</p>
        </Col>
        <Col>
          <p>{`${item.price}`}</p>
        </Col>
      </Row>
    );
  });
  React.useEffect(() => {
    setCartItems(testItems);
  }, []);

  function getTotalPrice(items) {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    return total.toFixed(2);
  }
  return (
    <Form>
      <Row className="mt-5 justify-content-around">
        <h1>Orders Confirmation</h1>
      </Row>
      <Row class="justify-content-center text-md-center">
        <p>
          Congratulations! Your Order has been placed. Your food is being
          prepared. You will get a notification when your order is on its way.
        </p>
        <p> Thank you for your order!</p>
      </Row>
      <Row className="justify-content-around">
        <h4> Order Details </h4>
      </Row>
      <Container className="p-5 border" fluid>
        {itemList}
        <Row>
          <Col>
            <b>Total cost: {getTotalPrice(cartItems)}</b>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default OrderConfirmation;
