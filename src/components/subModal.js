import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const SubModal = props => {
  const [number, setNumber] = useState();
  const onChange = e => {
    setNumber(e.target.value);
  };
  return (
    <Modal show={props.show === "sub"} onHide={props.cancelSub}>
      <Modal.Header closeButton>
        <Modal.Title>Sub Please!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control"
          onChange={e => onChange(e)}
          style={{ width: "4rem" }}
          required
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => props.submitSub(number)}>
          Sub
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SubModal;
