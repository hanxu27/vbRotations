import React, { useState } from "react";
import { Modal, Button, Row, Badge } from "react-bootstrap";
import ModalCard from "./modalCard";
import Court from "../components/court";
import { FaPlay } from "react-icons/fa";

const LineUpModal = props => {
  const [players, setPlayers] = useState({});
  const [serve, setServe] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [dupPlayers, setDupPlayers] = useState(false);

  const handleSubmit = () => {
    props.setServe(serve);
    props.setLineUp(players);
  };

  const handleOnChange = async e => {
    const k = e.target.id;
    const v = parseInt(e.target.value);
    if (v) {
      players[k] = [v];
    } else {
      delete players[k];
    }
    await setPlayers(players);
    await checkDupPlayer();
    await checkComplete();
  };

  const checkComplete = async () => {
    if (Object.keys(players).length === 6) {
      await setComplete(true);
    } else {
      await setComplete(false);
    }
  };

  const distinct = (value, index, self) => self.indexOf(value) === index;

  const checkDupPlayer = async () => {
    let courtPlayers = [];
    for (let [key, value] of Object.entries(players)) {
      courtPlayers.push(value[0]);
    }
    if (courtPlayers.filter(distinct).length !== Object.keys(players).length) {
      await setDupPlayers(true);
    } else {
      await setDupPlayers(false);
    }
  };

  const handleOptionChange = () => {
    setServe(!serve);
  };

  return (
    <Modal show={props.show === "line-up"}>
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title>
            {"Enter Line-up "}
            <FaPlay />
          </Modal.Title>
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
          {dupPlayers && <Badge variant="danger">Check Line-Up for Duplicate Players</Badge>}
          <Button variant="primary" disabled={!isComplete || dupPlayers} type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default LineUpModal;
