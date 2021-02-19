import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// import ProfileImg from "../../images/AboutMe/roberto_profile.jpg"
import ProfileImg from "../../images/AboutMe/Jacob.jpg"

const Jacob = () => {
    return (
        <Container>
            <Row className="justify-content-center mt-3">
                <Image src={ProfileImg} roundedCircle height="150px" />
            </Row>
            <p className="text-center m-0"><b>Jacob Sebastian</b></p>
            <p className="text-center mt-0">Software Developer</p>

            <hr />

            <p>He is an undergraduate student in his senior year at San Francisco State University, pursuing a degree in Computer Science. He likes to spend his free time playing games, learning new technology and going on long hikes. He loves crime and fantasy literature and series. While at school, he has gained extensive knowledge in programming methodologies, data structures, and algorithms. </p>
            <hr></hr>

           
        </Container>
    );
}

export default Jacob;