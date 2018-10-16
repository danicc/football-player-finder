import React from "react";
import { shallow } from "enzyme";

import { headers, players } from "../../constants";
import BasicTable from "../BasicTable";

function setup() {
  const props = {
    headers,
    items: players
  };
  const basicTableWrapper = shallow(<BasicTable {...props} />);

  return {
    basicTableWrapper
  };
}

describe("basic table component", () => {
  it("should render self and subcomponents", () => {
    const { basicTableWrapper } = setup();
    expect(basicTableWrapper.find("Table").length).toEqual(1);

    const theadWrapper = basicTableWrapper.find("thead");
    expect(theadWrapper.length).toEqual(1);
    expect(theadWrapper.parent().is("Table")).toBe(true);

    const headerRowWrapper = theadWrapper.childAt(0);
    expect(headerRowWrapper.is("tr")).toBe(true);
    expect(headerRowWrapper.find("th").length).toEqual(headers.length);

    const tbodyWrapper = basicTableWrapper.find("tbody");
    expect(tbodyWrapper.length).toEqual(1);
    expect(tbodyWrapper.parent().is("Table")).toBe(true);

    expect(tbodyWrapper.find("tr").length).toEqual(players.length);
    const bodyRowWrapper = tbodyWrapper.childAt(0);
    expect(bodyRowWrapper.find("td").length).toEqual(headers.length);
  });
});
