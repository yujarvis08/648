import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
const AccountChangePassword = () => {
   return(
       <Container>
       <Row className="justify-content-around">
       </Row>
       <Row className="justify-content-around"><h1></h1></Row>
       <Form style={{ textAlign: "left" }}>
               <h3>Change Password</h3>
    
               <Form.Row>
                 <Form.Label>First Name</Form.Label>
                <Form.Control type="C-P" placeholder="Current-Password" />
               < Button>Edit</Button>
               </Form.Row>
               <br></br>
               <Form.Row>
                 <Form.Label>Last Name</Form.Label>
                 <Form.Control type="New-P" placeholder="New Password" />
                 <Button>Edit</Button>
               </Form.Row>
               <br></br>
               <Form.Row>
                 <Form.Label>Email</Form.Label>
                 <Form.Control type="Confirm-Password" placeholder="Confirm Password" />
                 <Button>Edit</Button>
               </Form.Row>
               <br></br>
               <Form.Row>
                 <Form.Label>Update Password</Form.Label>
                 <Form.Control type="UD- Password" placeholder="Update Password" />
                 <Button>Edit</Button>
               </Form.Row>
               <br></br>
             </Form>
       </Container>
   )
   }
  
   export default AccountChangePassword;