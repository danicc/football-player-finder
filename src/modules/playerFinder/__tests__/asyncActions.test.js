import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import expect from "expect";

import * as actions from "../actions";
import * as types from "../actionTypes";
import { players } from "../constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  it("creates FETCH_PLAYERS_SUCCESS when fetching players has been done", async () => {
    fetchMock.getOnce(
      "https://football-players-b31f2.firebaseio.com/players.json",
      players
    );

    const expectedActions = [
      {
        type: types.FETCH_PLAYERS_REQUEST
      },
      {
        type: types.FETCH_PLAYERS_SUCCESS,
        payload: players
      }
    ];
    const store = mockStore({ players: [] });
    await store.dispatch(actions.requestPlayers());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
