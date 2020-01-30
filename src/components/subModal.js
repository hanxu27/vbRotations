import React from "react";
import { Modal, Button } from "react-bootstrap";

const SubModal = props => {
  return (
    <Modal show={props.show === "sub"}>
      <Modal.Header closeButton>
        <Modal.Title>Enter line-up</Modal.Title>
      </Modal.Header>
      <Modal.Body> sub modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SubModal;
