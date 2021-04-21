import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import banner from "./images/sfsubanner.png";
import Image from "react-bootstrap/Image";
import deliveryScooter from "./images/deliveryScooter.jpg";
import gator from "./images/gator.jpg";
import restaurant from "./images/restaurant.jpg";

// import { v4 as uuidv4 } from 'uuid';

const Homepage = () => {

  return (
    <Container className="bg-white">

      <Row className="mt-5">
        <Col sm={4}>
          <h2>
            <Image src={gator} fluid />
          </h2>
        </Col>
        <Col sm={8} className="align-self-center">
          <h4>
            Get food delivered to <b>any place on campus!</b> We serve
            SFSU students, faculty and campus staff at lightning fast speeds.
            Simply search for nearby restaurants, browse their menus, place your
            order, and let us do the rest while you relax or do your schoolwork.
          </h4>
        </Col>
      </Row>
      <hr />
      <Row className="mt-5">
        <Col sm={4}>
          <h2>
            <Image src={restaurant} fluid rounded />
          </h2>
        </Col >
        <Col sm={8} className="align-self-center">
          <h4>
            Restaurant owner? Join our platform! Cater to SFSU Students and
            <b> increase your online presence</b> and gain a band of regular, loyal
            customers.
          </h4>
        </Col>
      </Row>
      <hr />
      <Row className="mt-5">
        <Col sm={4}>
          <h2>
            <Image src={deliveryScooter} fluid rounded />
          </h2>
        </Col>

        <Col sm={8} className="align-self-center">
          <h4 >
            Delivery drivers can also easily link up with their restaurant and
            begin delivering today!
          </h4>
        </Col>

        {/* <img
            src={banner}
            alt="sfsu banner"
          // height="250px"
          // width="800px"
          ></img> */}
      </Row>
    </Container >
  );
};

export default Homepage;
