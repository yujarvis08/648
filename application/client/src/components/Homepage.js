import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Roberto from "./AboutMe/Roberto";
import Jarvis from "./AboutMe/Jarvis";

const Homepage = () => {
    return (
        <Container className="bg-white">

            <Row className="justify-content-around">
                <p>Software Engineering Class SFSU</p>
                <p>Spring 2021</p>
                <p>Section 03</p>
                <p>Team 03</p>
            </Row>

            <Tabs defaultActiveKey="Alex" id="uncontrolled-tab-example">
                <Tab eventKey="Alex" title="Alex">
                    <p>Put your About Me component here</p>
                </Tab>
                <Tab eventKey="Amit" title="Amit">
                    <p>Put your About Me component here</p>
                </Tab>
                <Tab eventKey="Angela" title="Angela">
                    <p>Put your About Me component here</p>
                </Tab>
                <Tab eventKey="Jacob" title="Jacob">
                    <p>Put your About Me component here</p>
                </Tab>
                <Tab eventKey="Jarvis" title="Jarvis">
                    <Jarvis />
                </Tab>
                <Tab eventKey="Roberto" title="Roberto">
                    <Roberto />
                </Tab>
            </Tabs>

        </Container>
    );
}

export default Homepage;