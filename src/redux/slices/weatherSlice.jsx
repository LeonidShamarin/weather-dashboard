import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherByCity, fetchForecastByCity } from '../../services/weatherApi';

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city) => {
    const weatherData = await fetchWeatherByCity(city);
    const forecastData = await fetchForecastByCity(city);
    return {
      currentWeather: weatherData,
      forecast: forecastData
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
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