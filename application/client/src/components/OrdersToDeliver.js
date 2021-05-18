import React from "react";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CampusMap from "./CampusMap";
import Card from "react-bootstrap/Card";


const OrdersToDeliver = () => {
  const [show, setShow] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // let orderTestData = [
  //   {
  //     orderNumber: 1,
  //     customerName: "Johnny Depp",
  //     addressLine1: "1600 Holloway Ave",
  //     addressLine2: "Building 336",
  //     instructions: "Room 123 at the end of the hallway",
  //     total: 13.24
  //   },
  //   {
  //     orderNumber: 2,
  //     customerName: "Gary Newman",
  //     addressLine1: "1650 Holloway Ave",
  //     addressLine2: "",
  //     instructions: "Soccer field across the gym. I'll be by the bleachers",
  //     total: 25.16
  //   },
  //   {
  //     orderNumber: 3,
  //     customerName: "Josh Drake",
  //     addressLine1: "802 Font Blvd",
  //     addressLine2: "",
  //     instructions: "At the Sol Patch community garden near Mary Park Hall",
  //     total: 17.99
  //   }
  // ]

  async function handleComplete(e) {
    let orderNum = e.target.getAttribute("order-number");
    let orderBody = { orderId: orderNum, orderStatus: "delivered" };

    let wrappedResponse = await fetch("/api/orders/setStatus", {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderBody)
    });

    let response = await wrappedResponse.json();
    console.log('Response get orders:', response);
    if (!wrappedResponse.ok) {
      alert(`Error occured while fetching orders.\n${response.msg}`);
    } else {
      let response = await (await fetch(`/api/orders/getOrders`)).json();
      setOrders(response.orders);
    }
  }

  let orderList;
  if (orders.length > 0) {
    orderList = orders.map((order, i) => {
      return (
        <Card
          className="m-3"
          style={{ width: '25rem' }}
          key={i}
        >
          <Card.Header>Order Number: {`${order.orderId}`}</Card.Header>
          <Card.Body >
            <Card.Title>Customer Name</Card.Title>
            <Card.Text>{`${order.name}`}</Card.Text>
            <hr />
            <Card.Title>Delivery Address</Card.Title>
            <Card.Text>{`${order.line1}`}</Card.Text>
            <Card.Text>{`${order.line2}`}</Card.Text>
            <hr />
            <Card.Title>Delivery Instructions</Card.Title>
            <Card.Text>{`${order.comment}`}</Card.Text>
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
                  order-number={order.orderId}
                >Complete</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )
    })
  }
  /**
   * Get new orders for the specified restaurant (should only be the one the driver works for)
   */
  React.useEffect(async () => {
    let response = await (await fetch(`/api/orders/getOrders`)).json();
    console.log('new orders:', response.orders);
    setOrders(response.orders);
  }, [])

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
