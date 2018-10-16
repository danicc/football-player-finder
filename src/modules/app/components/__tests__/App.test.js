import React from "react";
import { shallow } from "enzyme";

import { App } from "../../index";
import PlayerFinder from "../../../playerFinder/components/PlayerFinder";

function setup() {
  const enzymeWrapper = shallow(<App />);
  return {
    enzymeWrapper
  };
}

describe("App component", () => {
  it("should render self and subcomponents", () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find("Grid").length).toEqual(1);

    const rowWrapper = enzymeWrapper.find("Row");
    expect(rowWrapper.length).toEqual(1);
    expect(rowWrapper.parent().is("Grid")).toBe(true);

    const colWrapper = enzymeWrapper.find("Col");
    expect(colWrapper.length).toEqual(1);
    expect(colWrapper.parent().is("Row")).toBe(true);
    expect(colWrapper.hasClass("player-container")).toBe(true);

    const errorBoundaryWrapper = colWrapper.find("ErrorBoundary");
    expect(errorBoundaryWrapper.length).toEqual(1);
    expect(errorBoundaryWrapper.parent().is("Col")).toBe(true);

    const playerFinderWrapper = enzymeWrapper.find(PlayerFinder);
    expect(playerFinderWrapper.length).toEqual(1);
    expect(playerFinderWrapper.parent().is("ErrorBoundary")).toBe(true);
  });
});
