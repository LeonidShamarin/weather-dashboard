import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import favoritesReducer from "./slices/favoritesSlice";
import unitsReducer from "./slices/unitsSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    units: unitsReducer,
  },
});

export default store;
