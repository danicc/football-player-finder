import * as actionTypes from "./actionTypes";

export const fetchPlayersRequest = () => ({
  type: actionTypes.FETCH_PLAYERS_REQUEST
});

export const fetchSuccess = players => ({
  type: actionTypes.FETCH_PLAYERS_SUCCESS,
  payload: players
});

export const fetchFailure = error => ({
  type: actionTypes.FETCH_PLAYERS_FAILURE,
  payload: error
});

export const filter = filters => ({
  type: actionTypes.FILTER,
  payload: filters
});

export function requestPlayers() {
  return async dispatch => {
    dispatch(fetchPlayersRequest());
    try {
      const response = await fetch(
        `https://football-players-b31f2.firebaseio.com/players.json`
      );
      const players = await response.json();
      dispatch(fetchSuccess(players));
    } catch (exception) {
      dispatch(fetchFailure(exception.message));
    }
  };
}
