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
          setServe={props.setServe}
          frontZones={props.frontZones}
          backZones={props.backZones}
        />
      ) : (
        <SubModal
          show={props.show}
          cancelSub={props.cancelSub}
          submitSub={props.submitSub}
          subsLeft={props.subsLeft}
        />
      )}
    </React.Fragment>
  );
};

export default ModalContainer;
