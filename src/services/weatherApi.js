import axios from 'axios';
import { API_KEY, BASE_URL } from '../constants/config';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
});

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
  }
};

export const fetchForecastByCity = async (city) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
  }
};
