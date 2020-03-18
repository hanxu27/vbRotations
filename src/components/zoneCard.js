import React from "react";
import { Card, Button } from "react-bootstrap";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight
} from "react-icons/fa";

const ZoneCard = props => {
  const arrow = {
    1: <FaArrowAltCircleLeft />,
    2: <FaArrowAltCircleDown />,
    3: <FaArrowAltCircleRight />,
    4: <FaArrowAltCircleRight />,
    5: <FaArrowAltCircleUp />,
    6: <FaArrowAltCircleLeft />
  };
  return (
    <Card
      style={{
        maxHeight: "20rem",
        width: "15rem",
        opacity: "0.9"
      }}
    >
      <Card.Title style={{ margin: "1rem" }}>
        {arrow[props.zone]} {`Zone ${props.zone}`}
      </Card.Title>
      <Card.Body>
        <Button onClick={e => props.handleSubModal(e)} id={props.zone}>
          {props.lineup &&
            props.lineup.map(number => {
              return `${number} | `;
            })}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ZoneCard;
