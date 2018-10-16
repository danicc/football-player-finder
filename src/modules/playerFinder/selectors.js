import { createSelector } from "reselect";

import { NAME } from "./constants";
import { getAge } from "../../utils";

export const getIsLoading = state => state[NAME].isLoading;
export const getErrors = state => state[NAME].errors;
export const getFilters = state => state[NAME].filters;

const getPlayers = state => state[NAME].players;
export const getCurrentPlayers = createSelector(
  [getFilters, getPlayers],
  (filters, players) => {
    if (filters && Object.keys(filters).length > 0) {
      return players.filter(player => {
        return (
          (!filters.name ||
            player.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (!filters.position || player.position === filters.position) &&
          (!filters.age ||
            getAge(new Date(player.dateOfBirth)) === parseInt(filters.age))
        );
      });
    } else {
      return players;
    }
  }
);
