import React from "react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import SfsuMap from "./sfsu_map.jpg";
import Southwest from "../images/campus/southwest.jpg";
import Northwest from "../images/campus/northwest.jpg";
import Southeast from "../images/campus/southeast.jpg";
import Northeast from "../images/campus/northeast.jpg";

const CampusMap = ({ showState, handleClose, quadrant }) => {
  return (
    <Modal show={showState} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title> Campus Map: <b>{quadrant}</b> </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {quadrant == "northeast" && <Image src={Northeast} fluid />}
        {quadrant == "southeast" && <Image src={Southeast} fluid />}
        {quadrant == "northwest" && <Image src={Northwest} fluid />}
        {quadrant == "southwest" && <Image src={Southwest} fluid />}
        {quadrant == "all" && <Image src={SfsuMap} fluid />}
      </Modal.Body>
    </Modal>
  );
};
export default CampusMap;
