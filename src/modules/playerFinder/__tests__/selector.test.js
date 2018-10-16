import { getAge } from "../../../utils";
import {
  getCurrentPlayers,
  getIsLoading,
  getErrors,
  getFilters
} from "../selectors";
import { NAME, players } from "../constants";

describe("player finder selectors", () => {
  const state = {
    playerFinder: {
      isLoading: true,
      errors: "Internal Server Error",
      filters: {
        name: "player Name"
      }
    },
    otherModule: {
      otherModuleProp: "prop"
    }
  };

  const auxPlayer = {
    contractUntil: "2050-06-30",
    dateOfBirth: "1978-06-24",
    jerseyNumber: 10,
    name: "Roman Riquelme",
    nationality: "Argentina",
    position: "Attacking Midfield"
  };

  it("return all players", () => {
    const currentPlayers = getCurrentPlayers.resultFunc({}, players);
    expect(currentPlayers).toEqual(players);
  });

  it("return player list empty - no maching age", () => {
    const currentPlayers = getCurrentPlayers.resultFunc(
      {
        name: auxPlayer.name,
        position: auxPlayer.position,
        age: getAge(new Date(auxPlayer.dateOfBirth)) + 1
      },
      players
    );
    expect(currentPlayers.length).toEqual(0);
  });

  it("return players filtered by name", () => {
    const updatedPlayers = [...players, auxPlayer];
    const currentPlayers = getCurrentPlayers.resultFunc(
      {
        name: auxPlayer.name
      },
      updatedPlayers
    );
    expect(currentPlayers.length).toEqual(1);
    expect(currentPlayers[0]).toEqual(auxPlayer);
  });

  it("return players filtered by position", () => {
    const updatedPlayers = [...players, auxPlayer];
    const currentPlayers = getCurrentPlayers.resultFunc(
      {
        position: auxPlayer.position
      },
      updatedPlayers
    );

    expect(currentPlayers.length).toEqual(1);
    expect(currentPlayers[0]).toEqual(auxPlayer);
  });

  it("return players filtered by age", () => {
    const updatedPlayers = [...players, auxPlayer];
    const currentPlayers = getCurrentPlayers.resultFunc(
      {
        age: getAge(new Date(auxPlayer.dateOfBirth))
      },
      updatedPlayers
    );

    expect(currentPlayers.length).toEqual(1);
    expect(currentPlayers[0]).toEqual(auxPlayer);
  });

  it("getIsLoading should only return `isLoading` property", () => {
    const isLoading = getIsLoading(state);
    expect(isLoading).toEqual(state[NAME].isLoading);
  });

  it("getErrors should only return `errors` property", () => {
    const errors = getErrors(state);
    expect(errors).toEqual(state[NAME].errors);
  });

  it("getFilters should only return `filters` property", () => {
    const errors = getFilters(state);
    expect(errors).toEqual(state[NAME].filters);
  });
});
