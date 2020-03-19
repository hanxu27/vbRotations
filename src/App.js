import React, { Component } from "react";
import { Container, CardGroup, Row, Button, Card, Badge, ProgressBar } from "react-bootstrap";
import "./App.css";
import ZoneCard from "./components/zoneCard";
import ModalContainer from "./containers/modalContainer";
import { GiVolleyballBall } from "react-icons/gi";

export default class App extends Component {
  state = {
    lineup: {},
    subs: 0,
    team1: 0,
    team2: 0,
    shouldRotate: null,
    rotationCount: 0,
    totalRotationCount: 0,
    show: "line-up",
    subZone: null,
    history: [],
    canUndo: false
  };

  subCount = 12;

  // undo functions
  undo = () => {
    const history = [...this.state.history];
    const current = history[history.length - 1];
    const last = history[history.length - 2];

    history.pop();

    if (current === last) {
      if (current === true) {
        this.setState(prevState => ({
          team2: prevState.team2 - 1
        }));
      } else {
        this.setState(prevState => ({
          team1: prevState.team1 - 1
        }));
      }
    } else {
      if (current === true) {
        this.setState(prevState => ({
          team2: prevState.team2 - 1
        }));
      } else {
        this.setState(prevState => ({
          team1: prevState.team1 - 1
        }));
        this.undoRotate();
      }
      this.setState({ shouldRotate: last });
    }

    this.setState({
      history
    });
    history.length === 1 && this.setState({ canUndo: false });
  };

  undoRotate = () => {
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

  // score functions
  clickTeam1 = () => {
    let history = [...this.state.history];
    history.push(false);
    this.state.shouldRotate && this.rotate();
    this.setState(prevState => ({
      team1: prevState.team1 + 1,
      shouldRotate: false,
      history,
      canUndo: true
    }));
  };
  clickTeam2 = () => {
    let history = [...this.state.history];
    history.push(true);
    this.setState(prevState => ({
      team2: prevState.team2 + 1,
      shouldRotate: true,
      history,
      canUndo: true
    }));
  };

  // line up functions
  setLineUp = lineup => {
    this.setState({ lineup });
    this.setState({ show: false });
  };
  setServe = serve => {
    this.setState({ shouldRotate: !serve, history: [!serve] });
  };

  // sub functions
  cancelSub = () => {
    this.setState({ show: false });
  };

  handleSubModal = e => {
    const subZone =
      (parseInt(e.target.id) + parseInt(this.state.rotationCount)) % 6 === 0
        ? 6
        : (parseInt(e.target.id) + parseInt(this.state.rotationCount)) % 6;
    this.setState({
      show: "sub",
      subZone
    });
  };

  submitSub = number => {
    let newLineup = this.state.lineup;
    newLineup[this.state.subZone].push(parseInt(number));
    this.setState({
      subs: this.state.subs + 1,
      lineup: newLineup,
      show: false
    });
  };

  rotate = () => {
    this.setState(prevState => {
      if (prevState.rotationCount === 5)
        return {
          rotationCount: 0,
          totalRotationCount: prevState.totalRotationCount + 1
        };
      return {
        rotationCount: prevState.rotationCount + 1,
        totalRotationCount: prevState.totalRotationCount + 1
      };
    });
  };

  frontZones = [4, 3, 2];
  backZones = [5, 6, 1];
  render() {
    const zoneCalc = zone =>
      zone + (this.state.rotationCount % 6) > 6
        ? this.state.lineup[zone + (this.state.rotationCount % 6) - 6]
        : this.state.lineup[zone + (this.state.rotationCount % 6)];

    return (
      <Container className="mt-5">
        <ModalContainer
          show={this.state.show}
          setLineUp={this.setLineUp}
          setServe={this.setServe}
          frontZones={this.frontZones}
          backZones={this.backZones}
          cancelSub={this.cancelSub}
          submitSub={this.submitSub}
          subsLeft={this.subCount - this.state.subs}
        />

        <Row className="justify-content-center">
          <Card className="mb-2 mr-2">
            <Card.Title>My Team {!this.state.shouldRotate && <GiVolleyballBall />}</Card.Title>
            <Button
              style={{ width: "12rem", height: "12rem" }}
              variant="success"
              onClick={this.clickTeam1}
            >
              <h1>{this.state.team1}</h1>
            </Button>
          </Card>
          <Card className="mb-2">
            <Card.Title>Other Team {this.state.shouldRotate && <GiVolleyballBall />}</Card.Title>
            <Button
              style={{ width: "12rem", height: "12rem" }}
              variant="danger"
              onClick={this.clickTeam2}
            >
              <h1>{this.state.team2}</h1>
            </Button>
          </Card>
        </Row>
        <ProgressBar now={100} striped label="Net" variant="dark" />
        <Row className="mt-2 justify-content-center">
          <CardGroup>
            {this.frontZones.map(zone => (
              <ZoneCard
                key={zone}
                lineup={zoneCalc(zone)}
                handleSubModal={this.handleSubModal}
                zone={zone}
              />
            ))}
          </CardGroup>
        </Row>
        <Row className="justify-content-center">
          <CardGroup>
            {this.backZones.map(zone => (
              <ZoneCard
                key={zone}
                lineup={zoneCalc(zone)}
                handleSubModal={this.handleSubModal}
                zone={zone}
              />
            ))}
          </CardGroup>
        </Row>
        <Row className="mt-2 justify-content-center">
          <h1>
            <Badge variant="secondary">Subs left: {this.subCount - this.state.subs}</Badge>
          </h1>
        </Row>
        <Row className="m-2 justify-content-center">
          <Button variant="warning" onClick={this.undo} disabled={!this.state.canUndo}>
            Undo
          </Button>
        </Row>
      </Container>
    );
  }
}
