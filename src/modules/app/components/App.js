import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import "../App.css";

import playerFinder from "../../playerFinder";
import { ErrorBoundary } from "../../errorBoundary";

class App extends Component {
  render() {
    const { components } = playerFinder;
    const { PlayerFinder } = components;
    return (
      <Grid fluid>
        <Row>
          <Col className="player-container">
            <ErrorBoundary>
              <PlayerFinder />
            </ErrorBoundary>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
