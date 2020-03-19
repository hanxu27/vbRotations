import React, { useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import { MdRepeat } from "react-icons/md";

const SubModal = props => {
  const [number, setNumber] = useState();
  const onChange = e => {
    setNumber(e.target.value);
  };
  return (
    <Modal show={props.show === "sub"} onHide={props.cancelSub}>
      <Modal.Header closeButton>
        <Modal.Title>
          {"Sub Please "}
          <MdRepeat />
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={() => props.submitSub(number)}>
        <Modal.Body style={{ backgroundColor: "#FFFF33" }}>
          <Row className="justify-content-center">
            {props.subsLeft === 0 ? (
              "No Subs Left"
            ) : (
              <input
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
          </Row>
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
