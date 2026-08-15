import { expect, jest, describe, it } from '@jest/globals';
import weatherReducer, { clearWeatherData, fetchWeatherData } from '../weatherSlice';
import { fetchWeatherByCity, fetchForecastByCity } from '../../../services/weatherApi';

jest.mock('../../../services/weatherApi');

describe('weatherSlice', () => {
  const initialState = {
    currentWeather: null,
    forecast: null,
    loading: false,
    error: null,
  };

  it('should return initial state', () => {
    expect(weatherReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should clear weather data', () => {
    const previousState = {
      currentWeather: { temp: 20 },
      forecast: { list: [] },
      loading: false,
      error: 'Some error',
    };

    expect(weatherReducer(previousState, clearWeatherData())).toEqual({
      ...previousState,
      currentWeather: null,
      forecast: null,
      error: null,
    });
  });

  it('should set loading true when fetching starts', () => {
    const action = { type: 'weather/fetchWeatherData/pending' };
    const state = weatherReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should update state with weather data on success', () => {
    const weatherData = { temp: 25 };
    const forecastData = { list: [] };

    const action = {
      type: 'weather/fetchWeatherData/fulfilled',
      payload: {
        currentWeather: weatherData,
        forecast: forecastData,
      },
    };

    const state = weatherReducer(initialState, action);

    expect(state.currentWeather).toEqual(weatherData);
    expect(state.forecast).toEqual(forecastData);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should set error on fetch failure', () => {
    const action = {
      type: 'weather/fetchWeatherData/rejected',
      error: { message: 'Failed to fetch' },
    };

    const state = weatherReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch');
  });

  it('should fetch weather data', async () => {
    const mockWeather = { temp: 25 };
    const mockForecast = { list: [] };

    fetchWeatherByCity.mockResolvedValue(mockWeather);
    fetchForecastByCity.mockResolvedValue(mockForecast);

    const dispatch = jest.fn();
    await fetchWeatherData('London')(dispatch);

    expect(dispatch).toHaveBeenCalled();
  });
});