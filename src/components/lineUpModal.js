import React, { useState } from "react";
import { Modal, Button, Row, InputGroup } from "react-bootstrap";
import ModalCard from "./modalCard";

const LineUpModal = props => {
  const [players, setPlayers] = useState({});
  const [serve, setServe] = useState(false);
  const [isEnabled, setEnabled] = useState(false);

  const handleSubmit = e => {
    props.setLineUp(players);
  };

  const handleOnChange = e => {
    const k = e.target.id;
    const v = parseInt(e.target.value);
    players[k] = [v];
    setPlayers(players);
    if (Object.keys(players).length === 6) setEnabled(true);
  };
  const handleOptionChange = e => {
    setServe(!serve);
  };
  return (
    <Modal show={props.show === "line-up"}>
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>Enter Line-up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-md-center">
            {props.frontZones.map(zone => (
              <ModalCard key={zone} zone={zone} handleOnChange={handleOnChange} />
            ))}
          </Row>
          <Row className="justify-content-md-center">
            {props.backZones.map(zone => (
              <ModalCard key={zone} zone={zone} handleOnChange={handleOnChange} />
            ))}
          </Row>
          <Row className="justify-content-md-center">
            <p>
              <input
                type="radio"
                value="Receive"
                checked={!serve}
                onChange={handleOptionChange}
                className="m-2"
              />
              Receive
            </p>
            <p>
              <input
                type="radio"
                value="Serve"
                checked={serve}
                onChange={handleOptionChange}
                className="m-2"
              />
              Serve
            </p>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={!isEnabled} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default LineUpModal;
