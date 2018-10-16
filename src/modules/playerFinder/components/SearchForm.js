import React from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";

import "../styles.css";
import { positions } from "../constants";

class SearchForm extends React.Component {
  state = {
    name: "",
    age: "",
    position: ""
  };

  getNameValidationState = () => {
    var isALetter = /^[a-zA-Z]+$/.test(this.state.name.replace(" ", ""));
    const length = this.state.name.length;
    let validationState = null;
    if (length > 0) {
      validationState = isALetter ? "success" : "error";
    }
    return validationState;
  };

  getAgeValidationState = () => {
    let validationState = null;
    if (this.state.age) {
      validationState =
        18 <= this.state.age && this.state.age <= 40 ? "success" : "error";
    }
    return validationState;
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleAgeChange = e => {
    this.setState({ age: e.target.value });
  };

  handlePositionChange = e => {
    this.setState({ position: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const nameValidationState = this.getNameValidationState();
    const ageValidationState = this.getAgeValidationState();
    if (
      (!nameValidationState || nameValidationState === "success") &&
      (!ageValidationState || ageValidationState === "success")
    ) {
      const { handleSearch } = this.props;
      const { name, position, age } = this.state;
      handleSearch(name, position, age);
    }
  };

  render() {
    const { name, age, position } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} inline>
        <FormGroup
          className="form-item"
          controlId="name"
          validationState={this.getNameValidationState()}
        >
          <FormControl
            type="text"
            value={name}
            placeholder="player name"
            onChange={this.handleNameChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup className="form-item" controlId="position">
          <FormControl
            componentClass="select"
            placeholder="select"
            onChange={this.handlePositionChange}
            onBlur={this.handlePositionChange}
            value={position}
          >
            <option value="">Position</option>
            {positions.map((position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup
          className="form-item"
          controlId="age"
          validationState={this.getAgeValidationState()}
        >
          <FormControl
            type="number"
            min="18"
            max="40"
            value={age}
            placeholder="age"
            onChange={this.handleAgeChange}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button className="form-item" type="submit">
          Search
        </Button>
      </Form>
    );
  }
}

export default SearchForm;
