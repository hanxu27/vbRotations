import React, { Component } from "react";
import { Container, CardGroup, Row, Card, Button } from "react-bootstrap";
import "./App.css";
export default class App extends Component {
  state = {
    lineup: { 1: [11], 2: [12], 3: [13], 4: [14], 5: [15], 6: [16] },
    subs: 0,
    rotationCount: 0
  };
  render() {
    console.log(this.state.lineup[1]);
    return (
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's
              content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Row className="justify-content-md-center">
          <Card id={4} style={{ width: "18rem" }}>
            <Card.Title>{this.state.lineup[4]}</Card.Title>
          </Card>
          <Card id={3} style={{ width: "18rem" }}>
            <Card.Title>{this.state.lineup[3]}</Card.Title>
          </Card>
          <Card id={2} style={{ width: "18rem" }}>
            <Card.Title>{this.state.lineup[2]}</Card.Title>
          </Card>
        </Row>
        <Row>
          <Card id={5} style={{ width: "18rem" }}>
            <Card.Title>{this.state.lineup[5]}</Card.Title>
          </Card>
          <Card id={6} style={{ width: "18rem" }}>
            <Card.Title>{this.state.lineup[6]}</Card.Title>
          </Card>
          <Card id={1} style={{ width: "18rem" }}>
            <Card.Title>{this.state.lineup[1]}</Card.Title>
          </Card>
        </Row>
      </Container>
    );
  }
}
