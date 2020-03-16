import React from "react";
import { Card, Button } from "react-bootstrap";

const ZoneCard = props => {
  return (
    <Card
      style={{
        width: "18rem",
        maxHeight: "20rem"
      }}
    >
      <Card.Title style={{ margin: "1rem" }}>{`Zone #${props.zone}`}</Card.Title>
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
