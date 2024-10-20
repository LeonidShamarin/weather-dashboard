import { useSelector } from "react-redux";
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner";

const WeatherForecast = () => {
  const { forecast, loading, error } = useSelector((state) => state.weather);

  if (loading)
    return (
      <>
        <p>Loading forecast...</p>
        <LoadingSpinner />
      </>
    );
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!forecast) return null;

  const groupByDay = (list) => {
    return list.reduce((days, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(item);
      return days;
    }, {});
  };

  const getDayData = (dayForecasts) => {
    const temps = dayForecasts.map((f) => f.main.temp);
    return {
      date: new Date(dayForecasts[0].dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      temp: Math.round(temps.reduce((a, b) => a + b) / temps.length),
      icon: dayForecasts[0].weather[0].icon,
      description: dayForecasts[0].weather[0].description,
    };
  };

  const dailyData = Object.values(groupByDay(forecast.list))
    .map(getDayData)
    .slice(0, 5);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {dailyData.map((day, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            <div className="font-bold">{day.date}</div>
            <img
              src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
              className="mx-auto"
            />
            <div className="text-xl font-bold">{day.temp}°C</div>
            <div className="text-sm text-gray-600">{day.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
