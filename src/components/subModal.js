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
      <form onSubmit={() => props.submitSub(number)}>
        <Modal.Body>
          {props.subsLeft === 0 ? (
            "No Subs Left"
          ) : (
            <input
              type="text"
              className="form-control"
              onChange={e => onChange(e)}
              style={{ width: "4rem" }}
              required
              type="number"
              min={1}
              step={1}
              max={99}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" disabled={props.subsLeft === 0}>
            Sub
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default SubModal;
