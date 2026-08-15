// import { expect, jest, describe, it, beforeEach } from '@jest/globals';
// import favoritesReducer, { addToFavorites, removeFromFavorites } from '../favoritesSlice';

// describe('favorites reducer', () => {
//   // Mock localStorage
//   const localStorageMock = (() => {
//     let store = {};
//     return {
//       getItem: jest.fn(key => store[key] || null),
//       setItem: jest.fn((key, value) => {
//         store[key] = value;
//       }),
//       clear: jest.fn(() => {
//         store = {};
//       }),
//     };
//   })();

//   // Replace global localStorage
//   Object.defineProperty(window, 'localStorage', {
//     value: localStorageMock,
//     writable: true
//   });

//   beforeEach(() => {
//     // Clear localStorage and reset all mocks before each test
//     localStorage.clear();
//     jest.clearAllMocks();
//   });

//   // Test initial state
//   describe('initial state', () => {
//     it('should use empty array when localStorage is empty', () => {
//       localStorage.getItem.mockReturnValueOnce(null);
//       expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual([]);
//     });

//     it('should load initial state from localStorage', () => {
//       const savedState = [{ id: 1, name: 'London' }];
//       localStorage.getItem.mockReturnValueOnce(JSON.stringify(savedState));
//       expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(savedState);
//     });
//   });

//   // Test addToFavorites
//   describe('addToFavorites', () => {
//     it('should add city to empty favorites list', () => {
//       const initialState = [];
//       const city = { id: 1, name: 'London' };
      
//       const newState = favoritesReducer(initialState, addToFavorites(city));
      
//       expect(newState).toEqual([city]);
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         'favorites',
//         JSON.stringify([city])
//       );
//     });

//     it('should add city to existing favorites list', () => {
//       const initialState = [{ id: 1, name: 'London' }];
//       const newCity = { id: 2, name: 'Paris' };
      
//       const newState = favoritesReducer(initialState, addToFavorites(newCity));
      
//       expect(newState).toEqual([...initialState, newCity]);
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         'favorites',
//         JSON.stringify([...initialState, newCity])
//       );
//     });

//     it('should not add duplicate city', () => {
//       const city = { id: 1, name: 'London' };
//       const initialState = [city];
      
//       const newState = favoritesReducer(initialState, addToFavorites(city));
      
//       expect(newState).toEqual(initialState);
//       // localStorage.setItem shouldn't be called when no changes are made
//       expect(localStorage.setItem).not.toHaveBeenCalled();
//     });

//     it('should handle adding city with different name but same id', () => {
//       const initialState = [{ id: 1, name: 'London' }];
//       const sameIdCity = { id: 1, name: 'London, UK' };
      
//       const newState = favoritesReducer(initialState, addToFavorites(sameIdCity));
      
//       expect(newState).toEqual(initialState);
//       expect(localStorage.setItem).not.toHaveBeenCalled();
//     });
//   });

//   // Test removeFromFavorites
//   describe('removeFromFavorites', () => {
//     it('should remove city from favorites list', () => {
//       const city = { id: 1, name: 'London' };
//       const initialState = [city];
      
//       const newState = favoritesReducer(initialState, removeFromFavorites(city.id));
      
//       expect(newState).toEqual([]);
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         'favorites',
//         JSON.stringify([])
//       );
//     });

//     it('should handle removing non-existent city', () => {
//       const initialState = [{ id: 1, name: 'London' }];
      
//       const newState = favoritesReducer(initialState, removeFromFavorites(2));
      
//       expect(newState).toEqual(initialState);
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         'favorites',
//         JSON.stringify(initialState)
//       );
//     });

//     it('should remove correct city when multiple cities exist', () => {
//       const initialState = [
//         { id: 1, name: 'London' },
//         { id: 2, name: 'Paris' },
//         { id: 3, name: 'New York' }
//       ];
      
//       const newState = favoritesReducer(initialState, removeFromFavorites(2));
      
//       expect(newState).toEqual([
//         { id: 1, name: 'London' },
//         { id: 3, name: 'New York' }
//       ]);
//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         'favorites',
//         JSON.stringify([
//           { id: 1, name: 'London' },
//           { id: 3, name: 'New York' }
//         ])
//       );
//     });
//   });

//   // Test error handling
//   describe('error handling', () => {
//     it('should handle localStorage.getItem throwing error', () => {
//       localStorage.getItem.mockImplementationOnce(() => {
//         throw new Error('Storage error');
//       });
      
//       expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual([]);
//     });

//     it('should handle invalid JSON in localStorage', () => {
//       localStorage.getItem.mockReturnValueOnce('invalid json');
      
//       expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual([]);
//     });
//   });
// });