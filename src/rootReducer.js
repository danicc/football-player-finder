import { combineReducers } from "redux";
import playerFinder from "./modules/playerFinder";

export default combineReducers({
  [playerFinder.constants.NAME]: playerFinder.reducer
});
