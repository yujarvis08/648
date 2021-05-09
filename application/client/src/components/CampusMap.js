import React from "react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import SfsuMap from "./sfsu_map.jpg";

const CampusMap = ({ showState, handleClose }) => {
  return (
    <Modal show={showState} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Campus Map </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={SfsuMap} fluid />
      </Modal.Body>
    </Modal>
  );
};
export default CampusMap;
