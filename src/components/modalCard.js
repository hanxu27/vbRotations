import React from "react";
import { Card } from "react-bootstrap";

const ModalCard = props => {
  return (
    <Card style={{ width: "6rem", opacity: "0.9" }}>
      <Card.Body>
        {`Zone ${props.zone}`}
        <input
          type="text"
          className="form-control"
          onChange={props.handleOnChange}
          id={props.zone}
          required
        />
      </Card.Body>
    </Card>
  );
};
export default ModalCard;
