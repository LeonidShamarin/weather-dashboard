import axios from "axios";
import { API_KEY, BASE_URL } from "../constants/config";

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: { appid: API_KEY },
});

const message = (error, fallback) =>
  new Error(error.response?.data?.message || fallback);

export const fetchWeatherByCity = async (city, units = "metric") => {
  try {
    const response = await weatherApi.get("/weather", {
      params: { q: city, units },
    });
    return response.data;
  } catch (error) {
    throw message(error, "Failed to fetch weather data");
  }
};

export const fetchForecastByCity = async (city, units = "metric") => {
  try {
    const response = await weatherApi.get("/forecast", {
      params: { q: city, units },
    });
    return response.data;
  } catch (error) {
    throw message(error, "Failed to fetch forecast data");
  }
};

export const fetchWeatherByCoords = async (lat, lon, units = "metric") => {
  try {
    const response = await weatherApi.get("/weather", {
      params: { lat, lon, units },
    });
    return response.data;
  } catch (error) {
    throw message(error, "Failed to fetch weather data");
  }
};

export const fetchForecastByCoords = async (lat, lon, units = "metric") => {
  try {
    const response = await weatherApi.get("/forecast", {
      params: { lat, lon, units },
    });
    return response.data;
  } catch (error) {
    throw message(error, "Failed to fetch forecast data");
  }
};
