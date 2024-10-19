import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/Layout/Layout';
import WeatherSearch from './components/WeatherSearch/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import WeatherForecast from './components/WeatherForecast/WeatherForecast';
import FavoritesList from './components/FavoritesList/FavoritesList';

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <div className="max-w-7xl mx-auto">
          <WeatherSearch />
          <WeatherDisplay />
          <WeatherForecast />
          <FavoritesList />
        </div>
      </Layout>
    </Provider>
  );
};

export default App;