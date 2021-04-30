import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';


const Footer = () => {

    return (
        <Container style={{ backgroundColor: "#264653" }} fluid>
            <Row className="text-center text-white">
                <Col ><Link className="text-white" to="/about-us" >About Us</Link></Col>
                <Col>Created With 💜 By SFSU Students</Col>
                <Col><Link className="text-white" to="/terms-of-use" >Terms Of Use</Link></Col>
            </Row>
        </Container>
    )
}

export default Footer;