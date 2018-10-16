import React from "react";
import { shallow } from "enzyme";

import SearchForm from "../SearchForm";

function setup() {
  const props = {
    handleSearch: jest.fn()
  };

  const searchFormWrapper = shallow(<SearchForm {...props} />);

  return {
    searchFormWrapper,
    props
  };
}

describe("search form component", () => {
  it("should render self and subcomponents", () => {
    const { searchFormWrapper, props } = setup();
    expect(searchFormWrapper.find("Form").length).toEqual(1);

    const formGroups = searchFormWrapper.find("FormGroup");
    expect(formGroups.length).toBe(3);
    formGroups.forEach(node => {
      expect(node.hasClass("form-item")).toBe(true);
    });

    expect(searchFormWrapper.find("Button").length).toBe(1);
    const buttonWrapper = searchFormWrapper.find("Button").first();
    expect(buttonWrapper.hasClass("form-item")).toBe(true);
  });
  it("should handle form submit and call handleSearch", () => {
    const { searchFormWrapper, props } = setup();

    searchFormWrapper
      .find("Form")
      .first()
      .simulate("submit", { preventDefault: jest.fn() });

    expect(props.handleSearch.mock.calls.length).toBe(1);
  });
  it("should hanlde form submit and not call handleSearch method", () => {
    const { searchFormWrapper, props } = setup();

    const form = searchFormWrapper.find("Form").first();

    searchFormWrapper.setState({
      name: "1"
    });

    form.simulate("submit", { preventDefault: jest.fn() });

    expect(props.handleSearch.mock.calls.length).toBe(0);
  });
  it("handleNameChange method should set a new state", () => {
    const { searchFormWrapper } = setup();
    const mockedEvent = {
      target: {
        value: "name"
      }
    };
    searchFormWrapper.instance().handleNameChange(mockedEvent);

    const expectedState = {
      ...searchFormWrapper.state(),
      name: mockedEvent.target.value
    };

    expect(searchFormWrapper.state()).toEqual(expectedState);
  });
  it("handleAgeChange method should set a new state", () => {
    const { searchFormWrapper } = setup();
    const mockedEvent = {
      target: {
        value: 18
      }
    };
    searchFormWrapper.instance().handleAgeChange(mockedEvent);

    const expectedState = {
      ...searchFormWrapper.state(),
      age: mockedEvent.target.value
    };

    expect(searchFormWrapper.state()).toEqual(expectedState);
  });
  it("handlePositionChange method should set a new state", () => {
    const { searchFormWrapper } = setup();
    const mockedEvent = {
      target: {
        value: "Attacking Midfields"
      }
    };
    searchFormWrapper.instance().handlePositionChange(mockedEvent);

    const expectedState = {
      ...searchFormWrapper.state(),
      position: mockedEvent.target.value
    };

    expect(searchFormWrapper.state()).toEqual(expectedState);
  });

  it("getNameValidationState should return null", () => {
    const { searchFormWrapper } = setup();

    const result = searchFormWrapper.instance().getNameValidationState();
    expect(result).toBeNull();
  });

  it("getNameValidationState should return `success`", () => {
    const { searchFormWrapper } = setup();
    searchFormWrapper.setState({
      name: "firstName lastName"
    });
    const result = searchFormWrapper.instance().getNameValidationState();
    expect(result).toEqual("success");
  });
  it("getNameValidationState should return `error`", () => {
    const { searchFormWrapper } = setup();
    searchFormWrapper.setState({
      name: "first-name"
    });
    const result = searchFormWrapper.instance().getNameValidationState();
    expect(result).toEqual("error");
  });
  it("getAgeValidationState should return null", () => {
    const { searchFormWrapper } = setup();

    const result = searchFormWrapper.instance().getAgeValidationState();

    expect(result).toBeNull();
  });
  it("getAgeValidationState should return success", () => {
    const { searchFormWrapper } = setup();

    searchFormWrapper.setState({
      age: 18
    });
    let result = searchFormWrapper.instance().getAgeValidationState();
    expect(result).toEqual("success");

    searchFormWrapper.setState({
      age: 40
    });
    result = searchFormWrapper.instance().getAgeValidationState();
    expect(result).toEqual("success");
  });
  it("getAgeValidationState should return error", () => {
    const { searchFormWrapper } = setup();

    searchFormWrapper.setState({
      age: 17
    });
    let result = searchFormWrapper.instance().getAgeValidationState();
    expect(result).toEqual("error");

    searchFormWrapper.setState({
      age: 41
    });
    result = searchFormWrapper.instance().getAgeValidationState();
    expect(result).toEqual("error");
  });
});
