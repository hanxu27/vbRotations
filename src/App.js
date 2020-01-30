import React, { Component } from "react";
import { Container, CardGroup, Row, Button } from "react-bootstrap";
import "./App.css";
import ZoneCard from "./components/zoneCard";
import ModalContainer from "./containers/modalContainer";

export default class App extends Component {
  state = {
    lineup: {},
    subs: 0,
    rotationCount: 0,
    totalRotationCount: 0,
    show: "line-up"
  };

  setLineUp = lineup => {
    this.setState({ lineup });
    this.setState({ show: false });
  };

  rotate = () => {
    this.setState(prevState => {
      if (prevState.rotationCount === 5)
        return { rotationCount: 0, totalRotationCount: prevState.totalRotationCount + 1 };
      return {
        rotationCount: prevState.rotationCount + 1,
        totalRotationCount: prevState.totalRotationCount + 1
      };
    });
  };

  undo = rotationCount => {
    this.setState(prevState => {
      if (prevState.totalRotationCount > 0 && prevState.rotationCount === 0)
        return {
          rotationCount: 5,
          totalRotationCount: prevState.totalRotationCount - 1
        };
      else if (prevState.totalRotationCount > 0)
        return {
          rotationCount: prevState.rotationCount - 1,
          totalRotationCount: prevState.totalRotationCount - 1
        };
      return {
        totalRotationCount: prevState.totalRotationCount,
        rotationCount: prevState.rotationCount
      };
    });
  };

  frontZones = [4, 3, 2];
  backZones = [5, 6, 1];
  render() {
    return (
      <Container className="mt-5">
        <ModalContainer
          show={this.state.show}
          setLineUp={this.setLineUp}
          frontZones={this.frontZones}
          backZones={this.backZones}
        />
        <Row className="justify-content-md-center">
          <CardGroup>
            {this.frontZones.map(zone => (
              <ZoneCard
                key={zone}
                lineup={
                  zone + (this.state.rotationCount % 6) > 6
                    ? this.state.lineup[zone + (this.state.rotationCount % 6) - 6]
                    : this.state.lineup[zone + (this.state.rotationCount % 6)]
                }
                zone={zone}
              />
            ))}
          </CardGroup>
        </Row>
        <Row className="justify-content-md-center">
          <CardGroup>
            {this.backZones.map(zone => (
              <ZoneCard
                key={zone}
                lineup={
                  zone + (this.state.rotationCount % 6) > 6
                    ? this.state.lineup[zone + (this.state.rotationCount % 6) - 6]
                    : this.state.lineup[zone + (this.state.rotationCount % 6)]
                }
                zone={zone}
              />
            ))}
          </CardGroup>
        </Row>
        <Row className="justify-content-md-center">
          <Button variant="success" onClick={this.rotate}>
            Rotate
          </Button>
          <Button variant="danger" onClick={this.undo}>
            Undo
          </Button>
        </Row>
      </Container>
    );
  }
}
