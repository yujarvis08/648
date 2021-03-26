import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Roberto from "./AboutMe/Roberto";
import Amit from "./AboutMe/Amit";
import Jacob from "./AboutMe/Jacob";
import Alex from "./AboutMe/Alex";
import Jarvis from "./AboutMe/Jarvis";
import Angela from "./AboutMe/Angela";


const Homepage = () => {

  fetch('/ping')
    .then(response => response.json())
    .then(data => console.log(data));

  const menuItem = {
    name: 'spaghetti',
    price: 11.25,
    size: 'large'
  }

  fetch('/addMenuItem', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(menuItem)
  })
    .then(response => response.json())
    .then(data => console.log('menu item returned:', data))

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
          <Alex />
        </Tab>
        <Tab eventKey="Amit" title="Amit">

          <Amit />
        </Tab>

        <Tab eventKey="Angela" title="Angela">
          <Angela />

        </Tab>
        <Tab eventKey="Jacob" title="Jacob">
          <Jacob />
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
};


export default Homepage;
