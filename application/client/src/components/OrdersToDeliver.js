import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CampusMap from "./CampusMap";
import Card from "react-bootstrap/Card";


const OrdersToDeliver = () => {
  const [show, setShow] = React.useState(false);
  // const [orders, setOrders] = React.useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let orderTestData = [
    {
      orderNumber: 1,
      customerName: "Johnny Depp",
      addressLine1: "1600 Holloway Ave",
      addressLine2: "Building 336",
      instructions: "Room 123 at the end of the hallway",
      total: 13.24
    },
    {
      orderNumber: 2,
      customerName: "Gary Newman",
      addressLine1: "1650 Holloway Ave",
      addressLine2: "",
      instructions: "Soccer field across the gym. I'll be by the bleachers",
      total: 25.16
    },
    {
      orderNumber: 3,
      customerName: "Josh Drak",
      addressLine1: "802 Font Blvd",
      addressLine2: "",
      instructions: "At the Sol Patch community garden near Mary Park Hall",
      total: 17.99
    }
  ]

  async function handleComplete(e) {
    let orderNum = e.target.getAttribute("order-number");
    console.log('orderNum:', orderNum)
    let orderBody = { orderId: orderNum };

    // let wrappedResponse = await fetch("/api/orders/deliver", {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(orderBody), 
    // });

    // let response = await wrappedResponse.json();
    // console.log('Response from registering customer:', response);
    // if (wrappedResponse.ok) {
    // // this is temporary. We should be using a state variable for this
    //   orderTestData = orderTestData.filter(order => order.orderNumber !== orderNum);
    // } else {
    //   alert(`Error:. ${response.msg}`);
    // }
  }

  const orderList = orderTestData.map((order, i) => {
    return (
      <Card
        className="m-3"
        style={{ width: '25rem' }}
        key={i}
      >
        <Card.Header>Order Number: {`${order.orderNumber}`}</Card.Header>
        <Card.Body >
          <Card.Title>Customer Name</Card.Title>
          <Card.Text>{`${order.customerName}`}</Card.Text>
          <hr />
          <Card.Title>Delivery Address</Card.Title>
          <Card.Text>{`${order.addressLine1}`}</Card.Text>
          <Card.Text>{`${order.addressLine2}`}</Card.Text>
          <hr />
          <Card.Title>Delivery Instructions</Card.Title>
          <Card.Text>{`${order.instructions}`}</Card.Text>
          <hr />
          <Row>
            <Col xs={7}>
              Total: {`${order.total}`}
            </Col>
            <Col xs={3}>
              <Button
                className="mr-3"
                variant="outline-success"
                onClick={handleComplete}
                order-number={order.orderNumber}
              >Complete</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  })

  /**
   * Get new orders for the specified restaurant (should only be the one the driver works for)
   */
  // React.useEffect(async () => {
  //  let newOrders = await (await fetch(`/api/deliveryDriver/orders/${restaurantName}`)).json();
  //  setOrders(newOrders);
  // })

  return (
    <Container>
      {/* Campus Map conditionally rendered (it's a modal) */}
      <CampusMap showState={show} handleClose={handleClose} />
      <Row className="mt-5 justify-content-around">
        <h1>Orders to Deliver</h1>
        <hr />
      </Row>
      <Button variant="light" onClick={handleShow}>
        Campus Map
      </Button>
      <Row>
        {orderList}
      </Row>
    </Container>
  );
};
export default OrdersToDeliver;
