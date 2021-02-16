import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// import ProfileImg from "../../images/AboutMe/roberto_profile.jpg"
import ProfileImg from "../../images/AboutMe/roberto.jpg"

const Roberto = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Image src={ProfileImg} roundedCircle height="150px" />
            </Row>
        </Container>
    );
}

export default Roberto;