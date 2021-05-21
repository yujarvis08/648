import React from 'react';
// Bootstrap
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form';

const MenuItemModal = ({
    showState, handleClose,
    menuItem,
    quantity, setQuantity,
    total }) => {

    function handleDecrement() {
        let newQuantity = quantity - 1;
        if (newQuantity < 0) {
            newQuantity = 0;
        }
        setQuantity(newQuantity);
    }
    function handleIncrement() {
        let newQuantity = quantity + 1;
        if (newQuantity < 0) {
            newQuantity = 0;
        }
        setQuantity(newQuantity);
    }

    return (
        <Modal show={showState} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{menuItem.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1"></label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                            placeholder="No cheese, no peppers, etc"></textarea>
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer className="justify-content-around">
                <Row>
                    <Col xs={6}>
                        <div className="d-flex">
                            <Button onClick={handleDecrement}> - </Button>
                            <p className="ml-2 mr-2 ">Quantity</p>
                            <Button onClick={handleIncrement}> + </Button>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <Button>Add to cart</Button>
                    </Col>
                    <Col xs={2}>
                        <p>Total: {total}</p>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
}

export default MenuItemModal