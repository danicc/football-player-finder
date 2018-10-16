import React from "react";
import { shallow } from "enzyme";

import ErrorBoundary from "../ErrorBoundary";

describe("ErrorBoundary component", () => {
  const error = new Error("testing error boundary");
  const errorInfo = {
    componentStack: "error in ChildComponent"
  };

  it("should render self and subcomponents when an error have been thrown", () => {
    const errorBoundaryWrapper = shallow(<ErrorBoundary />);
    errorBoundaryWrapper.setState({
      error,
      errorInfo
    });

    const h2Wrapper = errorBoundaryWrapper.find("h2");
    expect(h2Wrapper.length).toEqual(1);
    expect(h2Wrapper.first().text()).toEqual("Something went wrong.");

    const detailsWrapper = errorBoundaryWrapper.find("details");
    expect(detailsWrapper.length).toEqual(1);
    expect(detailsWrapper.first().hasClass("details")).toBe(true);

    expect(detailsWrapper.childAt(0).text()).toEqual(error.toString());
    expect(detailsWrapper.find("br").length).toEqual(1);
    expect(detailsWrapper.childAt(2).text()).toEqual(errorInfo.componentStack);
  });
  it("should render self and subcomponents without an error", () => {
    const childText = "Some Child text";

    const errorBoundaryWrapper = shallow(
      <ErrorBoundary>
        <h1>{childText}</h1>
      </ErrorBoundary>
    );
    const childWrapper = errorBoundaryWrapper.find("h1");
    expect(childWrapper.length).toEqual(1);
    expect(childWrapper.first().text()).toEqual(childText);
  });
});
