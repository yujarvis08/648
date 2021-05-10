import React from "react";
import SearchAPI from "../../api/search";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RestaurantRegistration = () => {
  const [cuisines, setCuisines] = React.useState([]);
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    let match = form.confirmPassword.value === form.password.value ? "" : "Passwords must match!";
    form.confirmPassword.setCustomValidity(match);

    setValidated(true);
    if (form.checkValidity() === true) {
      // if form is valid, submit data
      /* Account { email, password }
        restaurantOwner { name }
        restaurant { restaurantName, restaurantDescription,
        priceRating, photo }
        address { line1, line2, city, state, zipcode }
        */
      const regData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        password: form.password.value,
        restaurantName: form.restaurant,
        restaurantDescription: form.restaurantDescription
      };

      let wrappedResponse = await fetch("/api/registration/customer", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData), // body data type must match "Content-Type" header
      });
      console.log("wrapped response:", wrappedResponse);

      let response = await wrappedResponse.json();
      // console.log('Response from registering customer:', response);
      if (wrappedResponse.ok) {
        alert("You've been registered! Login at the homepage.");
        history.push("/");
      } else {
        alert(`Registration failed. ${response.msg}`);
      }
    }



  };

  React.useEffect(async () => {
    // get list of unique quisines available from our DB
    let cuisinesArr = await SearchAPI.getCuisines();
    setCuisines(cuisinesArr)
  }, []);

  return (
    <Container>
      <Row className="mt-5 justify-content-around">
        <h1>Restaurant Owner Registration</h1>
      </Row>
      <hr />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <br />
        <h3>Account Info</h3>
        <p className="text-danger" >* All fields are required unless noted as optional</p>
        <br />
        {/* Registration Form */}

        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            required="true"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid first name
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="lastname"
            placeholder="Last Name"
            required="true"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid last name
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            pattern=".+@.+.com|.+@.+.net"
            required="true"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required="true"
            maxLength="20"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            name="password"
          />
          <Form.Text muted>Password must be 8-20 characters long and contain
             at least 1 number, 1 uppercase, and 1 lowercase letter.</Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6" controlId="validationCustom05">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" />
          <Form.Control.Feedback type="invalid">
            Passwords must match
          </Form.Control.Feedback>
        </Form.Group>

        <br></br>
        <br></br>
        <br></br>
        <h3>Restaurant Info</h3>
        <br></br>

        <Form.Group as={Col} md="6" controlId="validationCustom06">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            placeholder="Enter the name of your restaurant"
            required="true"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid restaurant name
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="6" controlId="validationCustom07">

          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Add a description of your restaurant"
            required="true"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid description
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="2" controlId="validationCustom07">
          <Form.Label>Cuisine</Form.Label>
          <Form.Control
            required="true"
            placeholder="What cuisine do you serve?"
            as="select"
            size="sm"
            custom
          >
            {cuisines.map((cuisine, index) => {
              return <option key={index}>{cuisine}</option>;
            })}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a cuisine type
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="6" controlId="validationCustom09">
          <Form.Label>Average Menu Price: &nbsp;</Form.Label>
          <Form.Check type="radio" label="$" name="option" required inline />
          <Form.Check type="radio" label="$$" name="option" required inline />
          <Form.Check type="radio" label="$$$" name="option" required inline />
          <Form.Control.Feedback type="invalid">
            Please select the average price for your menu items
          </Form.Control.Feedback>
        </Form.Group>

        <br></br>
        <br></br>
        <h3>Restaurant Address</h3>
        <br></br>

        <Form.Group as={Col} md="6" controlId="validationCustom10">
          <Form.Label>Address line 1</Form.Label>
          <Form.Control placeholder="1234 Main St" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid house number and street name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Address line 2 (optional)</Form.Label>
          <Form.Control placeholder="Apt 321" />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom11">

          <Form.Label>City</Form.Label>
          <Form.Control placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom12">
          <Form.Label>State</Form.Label>
          <Form.Control as="select" custom required >
            <option value="">Choose state</option>
            <option value="AK">Alaska</option>
            <option value="AL">Alabama</option>
            <option value="AR">Arkansas</option>
            <option value="AZ">Arizona</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DC">District of Columbia</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="IA">Iowa</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="MA">Massachusetts</option>
            <option value="MD">Maryland</option>
            <option value="ME">Maine</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MO">Missouri</option>
            <option value="MS">Mississippi</option>
            <option value="MT">Montana</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="NE">Nebraska</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NV">Nevada</option>
            <option value="NY">New York</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="PR">Puerto Rico</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VA">Virginia</option>
            <option value="VT">Vermont</option>
            <option value="WA">Washington</option>
            <option value="WI">Wisconsin</option>
            <option value="WV">West Virginia</option>
            <option value="WY">Wyoming</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a state
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="2" controlId="validationCustom13">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control placeholder="Zip Code" required minLength="5" maxLength="5" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zipcode
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <div className="ml-3">
            <p>Upload a restaurant image</p>
            <input type="file" accept="image/*" required></input>
            <div className="invalid-feedback">Please upload an image of your restaurant</div>
          </div>
        </Form.Group>

        <Form.Group >
          <input className="ml-3" type="checkbox" required />{" "}
          I agree to the <a href="/terms-of-use">Terms of Use</a>
          <Form.Control.Feedback type="invalid">
            You must agree before submitting
          </Form.Control.Feedback>
        </Form.Group>

        <br></br>
        <br></br>
        <Form.Row>
          <Button variant="primary" type="submit" className="ml-3">
            Submit
        </Button>
        </Form.Row>
      </Form>
      <hr />
      <br />
      <br />
    </Container>
  );
};

export default RestaurantRegistration;
