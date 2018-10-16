import * as actions from "../actions";
import * as types from "../actionTypes";

describe("actions", () => {
  it("should create an action for fetch players request", () => {
    const expectedAction = {
      type: types.FETCH_PLAYERS_REQUEST
    };
    expect(actions.fetchPlayersRequest()).toEqual(expectedAction);
  });

  it("should create an action to for loading error", () => {
    const errorMessage = "Internal Server Error";
    const expectedAction = {
      type: types.FETCH_PLAYERS_FAILURE,
      payload: errorMessage
    };
    expect(actions.fetchFailure(errorMessage)).toEqual(expectedAction);
  });

  it("should create an action for load players succesfully", () => {
    const players = [
      {
        contractUntil: "2022-06-30",
        dateOfBirth: "1993-05-13",
        jerseyNumber: 9,
        name: "Romelu Lukaku",
        nationality: "Belgium",
        position: "Centre-Forward"
      }
    ];
    const expectedAction = {
      type: types.FETCH_PLAYERS_SUCCESS,
      payload: players
    };
    expect(actions.fetchSuccess(players)).toEqual(expectedAction);
  });

  it("should create an action for filter players", () => {
    const filters = {
      name: "lukaku",
      age: 25
    };
    const expectedAction = {
      type: types.FILTER,
      payload: filters
    };
    expect(actions.filter(filters)).toEqual(expectedAction);
  });
});
