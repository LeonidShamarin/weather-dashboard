export const formatTemperature = (temp) => {
    return `${Math.round(temp)}°C`;
  };
  
  export const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  export const groupForecastByDay = (forecastList) => {
    return forecastList.reduce((days, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!days[date]) {
        days[date] = [];
      }
      days[date].push(item);
      return days;
    }, {});
  };