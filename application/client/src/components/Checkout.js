import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const history = useHistory();

  const testItems = [
    {
      name: "pork chops",
      price: 2.99
    },
    {
      name: "steak",
      price: 10.88
    },
    {
      name: "apple sauce",
      price: 0.99
    },
  ]

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
    )
  });

  function handleSubmit() {
    console.log('Submit order information to backend.')
  }

  React.useEffect(() => {
    setCartItems(testItems);
  }, []);

  function getTotalPrice(items) {
    let total = 0;
    items.forEach(item => {
      total += item.price
    });
    return total.toFixed(2);
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form className="p-3 mt-5">
            <h3>Checkout</h3>

            <Form.Row>
              <Form.Label>Address Line 1</Form.Label>
              <Form.Control name="Adress-line1" placeholder="Address line 2: " />
            </Form.Row>
            <br></br>
            <Form.Row>
              <Form.Label>Address Line 2</Form.Label>
              <Form.Control name="Adress-line2" placeholder="Adress line 2: " />
            </Form.Row>
            <br></br>
            <Form.Row>
              <Form.Label>City</Form.Label>
              <Form.Control name="City" placeholder="City: " />
            </Form.Row>
            <br></br>
            <Form.Row>
              <Form.Label>State</Form.Label>
              <Form.Control name="State" placeholder="State: " />
            </Form.Row>
            <br></br>
            <Form.Row>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control name="Zip" placeholder="Zipcode: " />
            </Form.Row>
            <br></br>
            <Form.Row>
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                name="Instructions"
                placeholder="Exact delivery instructions (room, area, field, etc)"
                as="textarea" rows={3} />
            </Form.Row>
          </Form>
        </Col>

        <Col md={6} className="p-3 mt-5">
          <h3>Order Details</h3>
          <Container className="p-5 border" fluid>
            {itemList}
            <Row>
              <Col><b>Total cost: {getTotalPrice(cartItems)}</b></Col>
            </Row>
          </Container>
          <Row className="justify-content-around p-2">
            <Button onClick={() => history.goBack()}>Back</Button>
            <Button onClick={handleSubmit}>Place Order</Button>
          </Row>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

export default Checkout;

