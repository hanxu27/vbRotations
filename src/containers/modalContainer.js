import React from "react";
import LineUpModal from "../components/lineUpModal";
import SubModal from "../components/subModal";

const ModalContainer = props => {
  return (
    <React.Fragment>
      {props.show === "line-up" ? (
        <LineUpModal
          show={props.show}
          setLineUp={props.setLineUp}
          frontZones={props.frontZones}
          backZones={props.backZones}
        />
      ) : (
        <SubModal show={props.show} />
      )}
    </React.Fragment>
  );
};

export default ModalContainer;
