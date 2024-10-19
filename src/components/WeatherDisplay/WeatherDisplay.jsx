import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites } from '../../redux/slices/favoritesSlice';

const WeatherDisplay = () => {
  const dispatch = useDispatch();
  const { currentWeather, loading, error } = useSelector((state) => state.weather);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!currentWeather) return null;

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(currentWeather));
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{currentWeather.name}</h2>
        <button
          onClick={handleAddToFavorites}
          className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
        >
          ★ Add to Favorites
        </button>
      </div>
      
      <div className="mt-4">
        <div className="text-4xl font-bold">
          {Math.round(currentWeather.main.temp)}°C
        </div>
        <div className="mt-2">
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind Speed: {currentWeather.wind.speed} m/s</p>
          <p>Weather: {currentWeather.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;