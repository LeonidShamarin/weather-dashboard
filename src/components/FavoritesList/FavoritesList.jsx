import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../../redux/slices/favoritesSlice';
import { fetchWeatherData } from '../../redux/slices/weatherSlice';

const FavoritesList = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleRemove = (cityId) => {
    dispatch(removeFromFavorites(cityId));
  };

  const handleRefresh = (cityName) => {
    dispatch(fetchWeatherData(cityName));
  };

  if (favorites.length === 0) {
    return (
      <div className="mt-4 text-center text-gray-500">
        No favorite cities added yet
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Favorite Cities</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((city) => (
          <div key={city.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{city.name}</h3>
                <p className="text-2xl">{Math.round(city.main.temp)}°C</p>
                <p className="text-sm">{city.weather[0].description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleRefresh(city.name)}
                  className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  🔄
                </button>
                <button
                  onClick={() => handleRemove(city.id)}
                  className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;