import React from 'react';
import { useHistory } from 'react-router-dom';
// Bootstrap
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ShoppingCart = ({ showState, handleClose, cartItems, cartTotal }) => {
    const history = useHistory();

    function handleCheckout() {
        history.push('/checkout');
        handleClose();
    }

    async function handleClear() {
        let response = await fetch('/api/shoppingCart/clear', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        response = await response.json()
        console.log(response.msg);
        alert(response.msg);
        handleClose();
    }

    return (
        <Modal show={showState} onHide={handleClose}>
            <Modal.Header closeButton>
                <h5>Shopping Cart</h5>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={2}>
                        <b>Qty</b>
                    </Col>
                    <Col xs={4}>
                        <b>Item</b>
                    </Col>
                    <Col xs={2}>
                        <b>Subtotal</b>
                    </Col>
                </Row>
                <hr className="mt-0" />
                {Object.keys(cartItems).map((key, i) => {
                    return (
                        <Row>
                            <Col xs={2}>
                                {cartItems[key].quantity}
                            </Col>
                            <Col xs={4}>
                                {cartItems[key].name}
                            </Col>
                            <Col xs={2}>
                                {cartItems[key].total}
                            </Col>
                        </Row>
                    )
                })}
                <hr />
                <Row className="justify-content-between">
                    <Col sm={5}>
                        <b>Total:</b>  ${cartTotal}
                    </Col>
                    <Col sm={3}>
                        <Button
                            variant="danger"
                            onClick={handleClear}
                        >
                            Clear
                        </Button>
                    </Col>
                    <Col sm={4}>
                        <Button
                            onClick={handleCheckout}
                            variant="success"
                        >
                            Checkout
                    </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default ShoppingCart;