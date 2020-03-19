import React from "react";
import { Card } from "react-bootstrap";

const ModalCard = props => {
  return (
    <Card style={{ width: "6rem", opacity: "0.9" }}>
      <Card.Body>
        {`Zone ${props.zone}`}
        <input
          className="form-control"
          onChange={props.handleOnChange}
          id={props.zone}
          required={true}
          type="number"
          min={1}
          step={1}
          max={99}
        />
      </Card.Body>
    </Card>
  );
};
export default ModalCard;
