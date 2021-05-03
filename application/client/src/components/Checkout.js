import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
const Checkout = () => {
  const [cartItems,setCartItems] = React.useState([]);
 const testItems = [
   { 
     name: "Pork Chops",
     price:2.99
   },
  {
   name: "Steak",
   price:2.99
  },
  {
  name:"Apple Sauce",
    price:0.99
  },
 ]
 const itemList = testItems.map((item,i)=>{
   return(
     <Row key ={i}>
       <Col>
       <p>
         <p>{`${item.name}`}</p>
       </p>
       </Col>
       <Col>
       <p>{`${item.price}`}</p>

       </Col>
     </Row>
   )

 });

  React.useEffect(() => {
    setCartItems(testItems);
  },[]);

  function getTotalPrice(items){
    let total = 0;
    items.forEach(item => {
      total += item.price});
      return total.toFixed(2);
    
  }

 return (
   <Container>
     <Row>
       <Col>
         <Form classNaME ="p-5">
           <h3>Checkout</h3>

           <Form.Row>
             <Form.Label>Address Line 1</Form.Label>
             <Form.Control name="AL-1" placeholder="Address line 2: " />
           </Form.Row>
           <br></br>
           <Form.Row>
             <Form.Label>Address Line 2</Form.Label>
             <Form.Control name="Adress-line2" placeholder="Adress line 2: " />
           </Form.Row>
           <br></br>
           <Form.Row>
             <Form.Label>City</Form.Label>
             <Form.Control name="City" placeholder="City: " />
           </Form.Row>
           <br></br>
           <Form.Row>
             <Form.Label>State</Form.Label>
             <Form.Control name="State" placeholder="State: " />
           </Form.Row>
           <br></br>
           <Form.Row>
             <Form.Label>Zipcode</Form.Label>
             <Form.Control type="Zip" placeholder="Zipcode: " />
           </Form.Row>
           <br></br>
           <Form.Row>
             <Form.Label>Instructions</Form.Label>
             <Form.Control type="Instructions" placeholder="Exact delivery instructions(room,area,field,etc): " />
           </Form.Row>
           <Form.Row>
             <Button type ="submit">Back</Button>
           </Form.Row>
         </Form>
       </Col>
       <Col>
        <Col className ="p-5">
          <h3>Order Details</h3>
          <Container className = "p-5 Border" fluid>
            {itemList}
            <Row>
           <Col>Total cost: {getTotalPrice(cartItems)}</Col>

            </Row>
          </Container>
        </Col> 
       </Col>
     </Row>
   </Container>
 );
};
 
export default Checkout;
