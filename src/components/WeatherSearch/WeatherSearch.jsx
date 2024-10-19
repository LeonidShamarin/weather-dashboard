import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeatherData } from "../../redux/slices/weatherSlice";

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(fetchWeatherData(city));
      setCity("");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default WeatherSearch;
