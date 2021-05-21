import React from "react";
import { useHistory } from 'react-router-dom';
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Checkout = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const [total, setTotal] = React.useState(0.00);
  const [validated, setValidated] = React.useState(false);
  const history = useHistory();

  async function clearCart() {
    let response = await fetch('/api/shoppingCart/clear', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    response = await response.json()
    console.log(response.msg);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity() === true) {
      let orderData = {
        line1: form.addressLine1.value,
        line2: form.addressLine2.value,
        city: form.city.value,
        state: form.state.value,
        zipcode: form.zipcode.value,
        cartItems,
        total,
        instructions: form.instructions.value,
      }

      let wrappedResponse = await fetch("/api/orders/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      let response = await wrappedResponse.json();
      console.log('response checkout:', response);
      console.log('ok:', wrappedResponse.ok);
      if (wrappedResponse.ok) {
        alert(`Order has been placed. Your food is being prepared and shall be delivered soon!`);
        clearCart();
        history.push('/');
      } else {
        alert('Something went wrong while processing your order.');
      }
    }
  }

  React.useEffect(async () => {
    let result = await (await fetch('/api/shoppingCart')).json();
    let totalTemp = result.cart.total;
    let items = result.cart;
    delete items["total"];
    console.log('totalTemp:', totalTemp)
    setCartItems(items);
    setTotal(totalTemp);
  }, []);

  return (
    <Container className="p-5">
      <Row><Col><h1>Checkout</h1></Col></Row>
      <hr />
      <Row>
        <Col md={6}>
          <h3>Delivery Address</h3>
          <Form
            noValidate
            validated={validated}
            className="p-3"
            onSubmit={handleSubmit}
          >
            <Form.Group as={Col} md="12" controlId="validationCustom10">
              <Form.Label>Address line 1</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                name="addressLine1"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid house number and street name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12">
              <Form.Label>Address line 2 (optional)</Form.Label>
              <Form.Control
                placeholder="Apt 321"
                name="addressLine2"
              />
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom11">
              <Form.Label>City</Form.Label>
              <Form.Control
                placeholder="City"
                name="city"
                readOnly
                defaultValue="San Francisco"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="stateDropdown">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                custom
                required
                name="state"
              >
                <option value="CA">California</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a state
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom13">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                placeholder="Zip Code"
                name="zipcode"
                required
                minLength="5"
                maxLength="5"
                readOnly
                defaultValue="94132"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zipcode
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom13">
              <Form.Label>Instructions</Form.Label>
              <Form.Control
                name="instructions"
                placeholder="Exact delivery instructions (room, area, field, etc)"
                as="textarea" rows={3}
              />
            </Form.Group>
            <Button type="submit">Place Order</Button>
          </Form>
        </Col>

        <Col md={6} >
          <h3>Order Details</h3>
          <Container className="p-5 border" fluid>
            <Row>
              <Col xs={2}>
                <b>Qty</b>
              </Col>
              <Col xs={4}>
                <b>Item</b>
              </Col>
              <Col xs={2}>
                <b>Subtotal</b>
              </Col>
            </Row>
            <hr className="mt-0" />
            {Object.keys(cartItems).map((key, i) => {
              return (
                <Row>
                  <Col xs={2}>
                    {cartItems[key].quantity}
                  </Col>
                  <Col xs={4}>
                    {cartItems[key].name}
                  </Col>
                  <Col xs={2}>
                    {cartItems[key].total}
                  </Col>
                </Row>
              )
            })}
            <hr />
            <Row>
              <Col><b>Total cost: </b>${total}</Col>
            </Row>
          </Container>
          {/* <Row className="justify-content-around p-2">
            <Button onClick={() => history.goBack()}>Back</Button>
          </Row> */}
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

