// import { expect, jest, describe, it, beforeEach } from '@jest/globals';
// import weatherReducer, { clearWeatherData, fetchWeatherData } from '../weatherSlice';
// import { fetchWeatherByCity, fetchForecastByCity } from '../../../services/weatherApi';

// jest.mock('../../../services/weatherApi');

// describe('weather reducer', () => {
//   const initialState = {
//     currentWeather: null,
//     forecast: null,
//     loading: false,
//     error: null,
//   };

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should handle initial state', () => {
//     expect(weatherReducer(undefined, { type: 'unknown' })).toEqual(initialState);
//   });

//   it('should handle clearWeatherData', () => {
//     const state = {
//       currentWeather: { temp: 20 },
//       forecast: { daily: [] },
//       loading: false,
//       error: 'Some error',
//     };

//     expect(weatherReducer(state, clearWeatherData())).toEqual({
//       ...state,
//       currentWeather: null,
//       forecast: null,
//       error: null,
//     });
//   });

//   it('should handle successful data fetch', async () => {
//     const mockWeatherData = { id: 1, name: 'London', main: { temp: 20 } };
//     const mockForecastData = { list: [{ dt: 1234567, main: { temp: 22 } }] };

//     fetchWeatherByCity.mockResolvedValue(mockWeatherData);
//     fetchForecastByCity.mockResolvedValue(mockForecastData);

//     const dispatch = jest.fn();
//     const thunk = fetchWeatherData('London');
//     await thunk(dispatch);

//     const [ fulfilledAction] = dispatch.mock.calls.map(call => call[0]);

//     // Check fulfilled action
//     expect(fulfilledAction.type).toBe(fetchWeatherData.fulfilled.type);
//     expect(fulfilledAction.payload).toEqual({
//       currentWeather: mockWeatherData,
//       forecast: mockForecastData,
//     });
//   });
// });