import React from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import MenuItemModal from "./MenuItemModal";


const TestModal = () => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Container>
            <MenuItemModal showState={show} handleClose={handleClose} />
            <Button variant="light" onClick={handleShow} > Menu Item </Button>
        </Container>
    )
}

export default TestModal;