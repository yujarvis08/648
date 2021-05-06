import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import CampusMap from "./CampusMap";
const OrdersToDeliver = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Form>
      <Row className="mt-5 justify-content-around">
        <h1>Orders to Deliver</h1>
      </Row>
      {/* <Row> */}
      <CampusMap showState={show} handleClose={handleClose} />
      <Col class="align-items-end">
        {" "}
        <Button variant="light" onClick={handleShow}>
          {" "}
          Campus Map
        </Button>
      </Col>
      {/* </Row> */}
      <div class="card">
        <div class="card-body">
          <h5 class="mt-0">Order Number :</h5>
          1234
          <div class="order mt-3">
            <div class="order-body">
              <h5 class="mt-0">Customer Name : </h5>
              Test Name
              <div class="order mt-3">
                <div class="order-body">
                  <h5 class="mt-0">Delivery Address : </h5>
                  1234 Main St.
                  <div class="order mt-3">
                    <div class="order-body">
                      <h5 class="mt-0">Delivery Instructions : </h5>
                      Please be covid safe.
                      <div class="text-right"> Order total : </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};
export default OrdersToDeliver;
