import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

// import Tabs from "react-bootstrap/Tabs";
// import Tab from "react-bootstrap/Tab";
// import Roberto from "./AboutMe/Roberto";
// import Amit from "./AboutMe/Amit";
// import Jacob from "./AboutMe/Jacob";
// import Alex from "./AboutMe/Alex";
// import Jarvis from "./AboutMe/Jarvis";
// import Angela from "./AboutMe/Angela";


const Homepage = () => {

  const [cuisines, setCuisines] = React.useState([]);
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    // get all restaurants
    fetch('/api/search/restaurant')
      .then(response => response.json())
      .then(data => setRestaurants(data.restaurants))
      .catch(console.log);
    // get all cuisines
    fetch('/api/search/restaurant/cuisines')
      .then(response => response.json())
      .then(data => setCuisines(data.cuisines))
      .catch(console.log);
  }, []);

  console.log('Restaurants', restaurants);

  return (
    <Container className="bg-white">
      <Row className="justify-content-around">
        <p>Software Engineering Class SFSU</p>
        <p>Spring 2021</p>
        <p>Section 03</p>
        <p>Team 03</p>
      </Row>

      <Form>
        <Form.Row className="align-items-center">

          <Col lg="8" className="m-auto">
            {/* Label for screen readers only */}
            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
              Enter a restaurant's name
            </Form.Label>

            <InputGroup className="mb-2">
              <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title="Cuisines"
                id="dropdown-cuisines"
              >
                {/* Cuisine dropdown item list */}
                {cuisines.map((cuisine, index) => {
                  return (<Dropdown.Item key={index}>{cuisine.cuisine}</Dropdown.Item>)
                })}

              </DropdownButton>

              <FormControl id="inlineFormInputGroup" placeholder="Enter a restaurant's name" />
            </InputGroup>
          </Col>

        </Form.Row>
      </Form>



      {/* <Tabs defaultActiveKey="Alex" id="uncontrolled-tab-example">
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
      </Tabs> */}
    </Container>
  );
};


export default Homepage;
