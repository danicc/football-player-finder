import * as actionTypes from "./actionTypes";

const initialState = {
  players: [],
  filters: {},
  errors: "",
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLAYERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.FETCH_PLAYERS_SUCCESS:
      return {
        ...state,
        players: [...state.players, ...action.payload],
        isLoading: false
      };
    case actionTypes.FETCH_PLAYERS_FAILURE:
      return {
        ...state,
        errors: action.payload,
        isLoading: false
      };
    case actionTypes.FILTER:
      return {
        ...state,
        filters: {
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
