import reducer from "../reducer";
import * as actionTypes from "../actionTypes";

describe("players reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      players: [],
      filters: {},
      errors: "",
      isLoading: false
    });
  });
  it("should handle FETCH_PLAYERS_REQUEST", () => {
    expect(reducer({}, { type: actionTypes.FETCH_PLAYERS_REQUEST })).toEqual({
      isLoading: true
    });
  });
  it("should handle FETCH_PLAYERS_SUCCESS", () => {
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
    expect(
      reducer(
        { players: [] },
        { type: actionTypes.FETCH_PLAYERS_SUCCESS, payload: players }
      )
    ).toEqual({
      isLoading: false,
      players
    });
  });
  it("should handle FETCH_PLAYERS_FAILURE", () => {
    const errorMessage = "Internal Server Error";
    expect(
      reducer(
        { isLoading: true, errors: "", players: [] },
        { type: actionTypes.FETCH_PLAYERS_FAILURE, payload: errorMessage }
      )
    ).toEqual({
      isLoading: false,
      errors: errorMessage,
      players: []
    });
  });
  it("should handle FILTER", () => {
    const filters = {
      name: "lukaku",
      position: "Centre-Forward",
      age: 25
    };
    expect(
      reducer(
        {},
        {
          type: actionTypes.FILTER,
          payload: filters
        }
      )
    ).toEqual({
      filters
    });
  });
});
