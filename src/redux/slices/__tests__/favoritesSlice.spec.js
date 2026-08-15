import { expect, describe, it, beforeEach } from "@jest/globals";
import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
} from "../favoritesSlice";

// This file used to be commented out in full. It also assumed favourites hold
// a whole weather response; they hold the city's identity now, and the
// temperature is fetched fresh instead of being frozen at the moment of adding.
const weatherResponse = (id, name, country = "UA") => ({
  id,
  name,
  sys: { country },
  main: { temp: 20 },
  weather: [{ description: "clear sky", icon: "01d" }],
});

const city = (id, name, country = "UA") => ({ id, name, country });

describe("favoritesSlice", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty when nothing is stored", () => {
    expect(favoritesReducer(undefined, { type: "unknown" })).toEqual([]);
  });

  it("keeps only the city identity, not the weather payload", () => {
    const state = favoritesReducer([], addToFavorites(weatherResponse(1, "Lviv")));

    expect(state).toEqual([city(1, "Lviv")]);
    expect(state[0].main).toBeUndefined();
  });

  it("persists the list to localStorage", () => {
    favoritesReducer([], addToFavorites(weatherResponse(1, "Lviv")));

    expect(JSON.parse(localStorage.getItem("favorites"))).toEqual([
      city(1, "Lviv"),
    ]);
  });

  it("does not add the same city twice", () => {
    const initial = [city(1, "Lviv")];

    const state = favoritesReducer(
      initial,
      addToFavorites(weatherResponse(1, "Lviv"))
    );

    expect(state).toEqual(initial);
  });

  it("removes the right city and leaves the others", () => {
    const initial = [city(1, "Lviv"), city(2, "Kyiv"), city(3, "London", "GB")];

    const state = favoritesReducer(initial, removeFromFavorites(2));

    expect(state).toEqual([city(1, "Lviv"), city(3, "London", "GB")]);
  });

  it("ignores a removal of a city that is not there", () => {
    const initial = [city(1, "Lviv")];

    expect(favoritesReducer(initial, removeFromFavorites(99))).toEqual(initial);
  });
});
