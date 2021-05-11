import React from "react";
import SearchAPI from "../../api/search";
import { useHistory } from "react-router-dom";
// Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";


const RestaurantRegistration = () => {
  const [cuisines, setCuisines] = React.useState([]);
  const [validated, setValidated] = React.useState(false);
  // const [menuItems, setMenuItems] = React.useState([{name: "", description: "", price: 0}]);
  const [numItems, setNumItems] = React.useState(1);

  /**
   * Appends a new menu item card into our registration form
   * It works by deep-cloning a menuItem Card element, cleaning it,
   * and appending it to a parent node.
   * Bad think about this function is that it's very sensitive to new
   * additions to the menuItem Card element due to the child indexes.
   * @param {Event} e 
   */
  function addMenuItem(e) {
    let parentNode = document.getElementById("menuItemsRow");
    let newNode = document.getElementsByName("menuItem")[0].cloneNode(true);
    // reset the values for the new node
    newNode.childNodes[0].childNodes[0].childNodes[1].value = ''; // item name
    newNode.childNodes[0].childNodes[1].childNodes[1].value = ''; // item description
    newNode.childNodes[0].childNodes[3].childNodes[1].value = ''; // item price
    console.log('wtf:', newNode.childNodes[0].childNodes[3].childNodes)
    // let removeBtn = newNode.childNodes[0].childNodes[3].childNodes[3];
    // add event listener (cloneNode deep copy doesn't clone event listeners)
    newNode.childNodes[0].childNodes[3].childNodes[3].addEventListener('click', removeMenuItem);
    // remove disabled attribute from button for the case when we clone from an item with it disabled
    newNode.childNodes[0].childNodes[3].childNodes[3].removeAttribute("disabled");
    parentNode.appendChild(newNode);
    setNumItems(numItems + 1);
  }

  /**
   * Removes the menu item Card from the registration form
   * It works by clicking on a remove button within the Card element
   * @param {Event} e 
   */
  function removeMenuItem(e) {
    console.log(e.currentTarget.parentNode.parentNode.parentNode)
    e.currentTarget.parentNode.parentNode.parentNode.remove();
    setNumItems(numItems - 1);
  }

  /**
   * Extracts the values from all of the menu items within the given form element
   * @param {Form} form 
   * @returns {Array} menuItems
   */
  function getMenuItems(form) {
    let menuItemArrays = {
      names: form.itemName,
      descriptions: form.itemDescription,
      prices: form.itemPrice,
    }
    let menuItems = []
    for (let i = 0; i < menuItemArrays.names.length; i++) {
      menuItems.push({
        name: menuItemArrays.names[i].value,
        description: menuItemArrays.descriptions[i].value,
        price: menuItemArrays.prices[i].value
      })
    }
    return menuItems;
  }

  /**
   * Validates the form before submitting the data
   * @param {Event} event 
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    // validate password and confirm password match
    const form = event.currentTarget;
    let match = form.confirmPassword.value === form.password.value ? "" : "Passwords must match!";
    form.confirmPassword.setCustomValidity(match);

    setValidated(true);

    let menuItems = getMenuItems(form); // temporarily here
    console.log('menu items in handle submit:', menuItems)
    // console.log('photo:', form.photo.files[0]);
    if (form.checkValidity() === true) {
      // if form is valid, submit data
      const regData = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        password: form.password.value,
        restaurantName: form.restaurantName.value,
        restaurantDescription: form.restaurantDescription.value,
        priceRating: form.priceRating.value,
        photo: form.photo.files[0],
        line1: form.addressLine1.value,
        line2: '',
        city: form.city.value,
        state: form.state.value,
        zipcode: form.zipcode.value,
        menuItems
      };
      // TODO: Figure out how to send a file along with the rest of the data
      // let fd = new FormData();
      // let postData = JSON.stringify(regData)
      // fd.append('postData', postData);
      // console.log('postData:', postData)
      // console.log('fd:', fd);

      // let wrappedResponse = await fetch("/api/registration/restaurantOwner", {
      //   method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   headers: { "Content-Type": "multipart/form-data" },
      //   body: JSON.stringify(regData), // body data type must match "Content-Type" header
      // });
      // console.log("wrapped response:", wrappedResponse);

      // let response = await wrappedResponse.json();
      // // console.log('Response from registering customer:', response);
      // if (wrappedResponse.ok) {
      //   alert("You've been registered! Login at the homepage.");
      //   history.push("/");
      // } else {
      //   alert(`Registration failed. ${response.msg}`);
      // }
    }
  };


  React.useEffect(async () => {
    // get list of unique quisines available from our DB
    let cuisinesArr = await SearchAPI.getCuisines();
    setCuisines(cuisinesArr)
    // Disable the remove button when there's only one menu item left
    let parentNode = document.getElementById("menuItemsRow");
    let removeBtn = parentNode.childNodes[0].childNodes[0].childNodes[3].childNodes[3];
    if (parentNode.children.length === 1) {
      removeBtn.setAttribute("disabled", "");
    } else {
      removeBtn.removeAttribute("disabled");
    }
  }, [numItems]);

  return (
    <Container>
      <Row className="mt-5 justify-content-around">
        <h1>Restaurant Owner Registration</h1>
      </Row>
      <hr />
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        id="registrationForm"
      >
        <br />
        <h3>Account Information</h3>
        <p className="text-danger" >All fields are required unless noted as optional</p>
        <br />
        {/* Registration Form */}

        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            required
            name="firstName"
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
            required
            name="lastName"
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
            required
            name="email"
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
            required
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

        <hr />
        <br></br>
        <h3>Restaurant Information</h3>
        <br></br>

        <Form.Group as={Col} md="6" controlId="validationCustom06">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            placeholder="Enter the name of your restaurant"
            required
            name="restaurantName"
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
            required
            name="restaurantDescription"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid description
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="2" controlId="validationCustom08">
          <Form.Label>Cuisine</Form.Label>
          <Form.Control
            required
            placeholder="What cuisine do you serve?"
            as="select"
            size="sm"
            custom
            name="restaurantCuisine"
          >
            {cuisines.map((cuisine, index) => {
              return <option key={index}>{cuisine}</option>;
            })}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a cuisine type
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="2" controlId="validationCustom09">
          <Form.Label>Average Menu Price:</Form.Label>
          <Form.Control
            as="select"
            custom
            required
            name="priceRating"
          >
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select the average price for your menu items
          </Form.Control.Feedback>
        </Form.Group>

        <hr />
        <br />
        <h3>Restaurant Address</h3>
        <br></br>

        <Form.Group as={Col} md="6" controlId="validationCustom10">
          <Form.Label>Address line 1</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            name="addressLine1"
            required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid house number and street name
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="6">
          <Form.Label>Address line 2 (optional)</Form.Label>
          <Form.Control
            placeholder="Apt 321"
            name="addressLine2"
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom11">

          <Form.Label>City</Form.Label>
          <Form.Control
            placeholder="City"
            name="city"
            required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="validationCustom12">
          <Form.Label>State</Form.Label>
          <Form.Control as="select" custom required name="state">
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
          <Form.Control
            placeholder="Zip Code"
            name="zipcode"
            required
            minLength="5"
            maxLength="5" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zipcode
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <div className="ml-3">
            <p>Upload a restaurant image</p>
            <input type="file" accept="image/*" required name="photo"></input>
            <div className="invalid-feedback">Please upload an image of your restaurant</div>
          </div>
        </Form.Group>

        <hr />
        <br />
        <h3>Restaurant Menu</h3>
        <br></br>
        <Form.Row id="menuItemsRow">
          <Card
            className="m-3"
            style={{ width: '25rem' }}
            name="menuItem"
          >
            <Card.Body>
              <Form.Group>
                <Form.Label>Item name:</Form.Label>
                <Form.Control placeholder="Spaghetti Pomodoro" name="itemName" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="itemDescription"
                  required
                  placeholder="Spaghetti pasta cooked al dente with tomatoes, fresh basil, garlic, and olive oil" />
              </Form.Group>
              <Form.Label>Price</Form.Label>
              <InputGroup className="p-0">
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control placeholder="0.00" name="itemPrice" required />
                <div name="spacer" className="col md-6"></div>
                <Button variant="danger" onClick={(e) => removeMenuItem(e)}>Remove</Button>
              </InputGroup>
            </Card.Body>
          </Card>
          {/* <Button style={{ width: "25rem", height: "20rem" }} 
          className="m-3" 
          id="addMenuItemBtn" 
          onClick={addMenuItem}
          >Add another menu item</Button> */}
        </Form.Row>
        <Button
          className="m-3"
          id="addMenuItemBtn"
          onClick={addMenuItem}
        >Add another menu item</Button>
        <hr />
        <br />

        <Form.Group >
          <input className="ml-3" type="checkbox" required />{" "}
          I agree to the <a href="/terms-of-use">Terms of Use</a>
          <Form.Control.Feedback type="invalid">
            You must agree before submitting
          </Form.Control.Feedback>
        </Form.Group>

        <br></br>
        <Form.Row>
          <Button style={{ width: "15rem" }} variant="primary" type="submit" className="ml-3">
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
