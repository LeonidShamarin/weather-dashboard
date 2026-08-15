import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWeatherByCity,
  fetchForecastByCity,
  fetchWeatherByCoords,
  fetchForecastByCoords,
} from "../../services/weatherApi";

/**
 * Accepts either a city name, or `{ city }` / `{ lat, lon }` with optional
 * `units`. The plain-string form is kept because that is how the rest of the
 * app and the tests call it.
 */
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (arg) => {
    const query = typeof arg === "string" ? { city: arg } : arg || {};
    const units = query.units || "metric";

    if (query.lat != null && query.lon != null) {
      const [currentWeather, forecast] = await Promise.all([
        fetchWeatherByCoords(query.lat, query.lon, units),
        fetchForecastByCoords(query.lat, query.lon, units),
      ]);
      return { currentWeather, forecast };
    }

    // Sequential in the original; the two calls do not depend on each other.
    const currentWeather = await fetchWeatherByCity(query.city, units);
    const forecast = await fetchForecastByCity(query.city, units);
    return { currentWeather, forecast };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    currentWeather: null,
    forecast: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearWeatherData: (state) => {
      state.currentWeather = null;
      state.forecast = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload.currentWeather;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearWeatherData } = weatherSlice.actions;
export default weatherSlice.reducer;
