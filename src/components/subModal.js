import React, { useState } from "react";
import { Modal, Button, Row, Badge } from "react-bootstrap";
import { MdRepeat } from "react-icons/md";

const SubModal = props => {
  const [number, setNumber] = useState();
  const [legalSub, setLegalSub] = useState(true);
  const [complete, setComplete] = useState(false);

  const onChange = async e => {
    let sub = parseInt(e.target.value);
    sub ? setComplete(true) : setComplete(false);
    checkSubs(sub);
  };
  const handleSub = e => {
    e.preventDefault();
    props.submitSub(number);
  };

  // check subs
  const checkSubs = async sub => {
    let dupPlayers = [];
    await setNumber(sub);
    for (let [key, value] of Object.entries(props.lineup)) {
      if (parseInt(key) !== props.subZone) {
        value.forEach(player => {
          dupPlayers.push(player);
        });
      } else {
        dupPlayers.push(value[value.length - 1]);
      }
    }
    await setLegalSub(!dupPlayers.includes(sub));
  };

  const findSub = () => {
    let subPlayer = props.subZone && props.lineup[props.subZone];
    return subPlayer && `${subPlayer[subPlayer.length - 1]} `;
  };

  return (
    <Modal show={props.show === "sub"} onHide={props.cancelSub}>
      <Modal.Header closeButton>
        <Modal.Title>
          {"Sub Please "}
          <MdRepeat />
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={e => handleSub(e)}>
        <Modal.Body style={{ backgroundColor: "#FFFF33" }}>
          <Row className="justify-content-center">
            {props.subsLeft === 0 ? (
              "No Subs Left"
            ) : (
              <Row className="justify-content-center">
                <h3>{findSub()} </h3>
                <MdRepeat />
                <input
                  className="form-control"
                  onChange={e => onChange(e)}
                  style={{ width: "6rem" }}
                  required
                  type="number"
                  min={1}
                  step={1}
                  max={99}
                />
              </Row>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {!legalSub && <Badge variant="danger">Illegal Sub Check Players!</Badge>}
          <Button
            variant="primary"
            type="submit"
            disabled={props.subsLeft === 0 || !legalSub || !complete}
          >
            Sub
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default SubModal;
