import React from "react";
import { Link } from 'react-router-dom';
// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// images
import deliveryScooter from "./images/deliveryScooter.jpg";
import gator from "./images/gator.jpg";
// import restaurant from "./images/restaurant.jpg";
import restaurant from "./images/restaurant.jpg";

const Homepage = () => {
  const textStyle = {
    fontSize: "20px",
    // fontFamily: "Open Sans",
    color: "black",
  }
  return (
    <Container className="bg-white" fluid>

      <h1 className="text-center p-5">Quickly get food delivered to <b>any place on campus!</b> </h1>

      <hr />

      {/* <Image src={food} className="position-relative" fluid style={{ bottom: "90px" }} /> */}

      <Row className="mt-5" >
        <Col sm={4}>
          <h2>
            <Image src={gator} fluid />
          </h2>
        </Col>
        <Col sm={8} className="align-self-center" >
          <Link name="sfsu-customers" to="/customer-registration"><h3>Students, faculty and staff</h3></Link>
          <br />
          <p style={textStyle}>
            We serve
            SFSU students, faculty and campus staff at lightning fast speeds.
            Simply search for nearby restaurants, browse their menus, place your
            order, and let us do the rest while you relax or do your schoolwork.
          </p>
        </Col>
      </Row>
      <hr />
      <Row className="mt-5" >
        <Col sm={4}>
          <p style={textStyle}>
            <Image src={restaurant} fluid rounded />
          </p>
        </Col >
        <Col sm={8} className="align-self-center" >
          <Link name="restaurant-owners" to="/restaurant-registration"><h3>Restaurant owners</h3></Link>
          <br />
          <p style={textStyle}>
            Join our platform! Cater to SFSU Students and
            <b> increase your online presence</b> and gain a band of regular, loyal
            customers.
          </p>
        </Col>
      </Row>
      <hr />
      <Row className="mt-5" >
        <Col sm={4}>
          <h2>
            <Image src={deliveryScooter} fluid rounded />
          </h2>
        </Col>

        <Col sm={8} className="align-self-center" >
          <Link name="delivery-drivers" to="/driver-registration"><h3>Delivery drivers</h3></Link>
          <br />
          <p style={textStyle} >
            Delivery drivers can also easily link up with their restaurant and
            begin delivering today!
          </p>
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
