import React from "react";
import { shallow } from "enzyme";
import { PlayerFinder } from "../PlayerFinder";
import { players, positions } from "../../constants";

function setup() {
  const props = {
    requestPlayers: jest.fn(),
    filter: jest.fn(),
    players,
    errors: "",
    isLoading: false
  };

  const playerFinderWrapper = shallow(<PlayerFinder {...props} />);

  return {
    playerFinderWrapper,
    props
  };
}

describe("player finder component", () => {
  it("should return self and BasicTable", () => {
    const { playerFinderWrapper } = setup();

    const panelHeadings = playerFinderWrapper.find("PanelHeading");
    expect(panelHeadings.length).toEqual(1);
    expect(panelHeadings.childAt(0).text()).toEqual("Football Player Finder");

    const panelBody = playerFinderWrapper.find("PanelBody");
    expect(playerFinderWrapper.find("PanelBody").length).toEqual(1);
    expect(panelBody.children().find("SearchForm").length).toEqual(1);
    expect(panelBody.children().find("BasicTable").length).toEqual(1);
  });
  it("should return self and loading text", () => {
    const { props } = setup();
    const updatedProps = {
      ...props,
      isLoading: true
    };
    const playerFinderWrapper = shallow(<PlayerFinder {...updatedProps} />);

    const panelBody = playerFinderWrapper.find("PanelBody");
    const panelBodyChildrens = panelBody.children();
    expect(panelBody.length).toEqual(1);

    expect(panelBodyChildrens.find("SearchForm").length).toEqual(1);

    expect(panelBodyChildrens.find("h2").length).toEqual(1);
    expect(panelBodyChildrens.find("h2").text()).toEqual("Loading ...");
  });
  it("should return self and error text", () => {
    const { props } = setup();
    const updatedProps = {
      ...props,
      errors: "Internal Server Error"
    };
    const playerFinderWrapper = shallow(<PlayerFinder {...updatedProps} />);

    const panelBody = playerFinderWrapper.find("PanelBody");
    const panelBodyChildrens = panelBody.children();
    expect(panelBody.length).toEqual(1);

    expect(panelBodyChildrens.find("SearchForm").length).toEqual(1);

    expect(panelBodyChildrens.find("h2").length).toEqual(1);
    expect(panelBodyChildrens.find("h2").text()).toEqual(
      "Error ocurrs in players loading"
    );
  });
  it("handle search should call filter function", () => {
    const { playerFinderWrapper, props } = setup();

    const filters = {
      name: "name",
      position: positions[0],
      age: 25
    };
    playerFinderWrapper
      .instance()
      .handleSearch(filters.name, filters.position, filters.age);

    expect(props.filter.mock.calls.length).toEqual(1);
    expect(props.filter.mock.calls[0][0]).toEqual(filters);
  });
  it("should call requestPlayers in componentDidMount", () => {
    const { props } = setup();

    expect(props.requestPlayers.mock.calls.length).toEqual(1);
  });
});
