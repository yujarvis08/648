import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {

    return (
        <Container style={{ backgroundColor: "#264653" }} fluid>
            <Row className="text-center text-white">
                <Col>About Us</Col>
                <Col>Created With 💜 By SFSU Students</Col>
                <Col>Terms Of Use</Col>
            </Row>
        </Container>
    )
}

export default Footer;