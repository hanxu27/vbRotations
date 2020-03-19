import React, { useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import ModalCard from "./modalCard";
import Court from "../components/court";

const LineUpModal = props => {
  const [players, setPlayers] = useState({});
  const [serve, setServe] = useState(false);
  const [isEnabled, setEnabled] = useState(false);

  const handleSubmit = () => {
    props.setServe(serve);
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
        <Court>
          <Modal.Body>
            <Row className="justify-content-center">
              {props.frontZones.map(zone => (
                <ModalCard key={zone} zone={zone} handleOnChange={handleOnChange} />
              ))}
            </Row>
            <Row className="justify-content-center">
              {props.backZones.map(zone => (
                <ModalCard key={zone} zone={zone} handleOnChange={handleOnChange} />
              ))}
            </Row>
            <Row className="justify-content-center">
              <p>
                <input
                  type="radio"
                  value="Receive"
                  checked={!serve}
                  onChange={handleOptionChange}
                  className="m-2"
                  required
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
        </Court>
        <Modal.Footer>
          <Button variant="primary" disabled={!isEnabled} type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default LineUpModal;
