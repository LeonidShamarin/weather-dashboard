import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "favorites";

// A corrupted or unreadable value must not take the whole app down on boot.
function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persist(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    /* private mode or a full quota: the list still works for this session */
  }
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFavorites(),
  reducers: {
    /**
     * Only the identity of the city is stored. The previous version saved the
     * whole weather response, so a favourite kept showing the temperature it
     * had at the moment it was added — the list is refreshed from the API now.
     */
    addToFavorites: {
      reducer: (state, action) => {
        if (state.find((city) => city.id === action.payload.id)) return state;
        state.push(action.payload);
        persist(state);
      },
      prepare: (weather) => ({
        payload: {
          id: weather.id,
          name: weather.name,
          country: weather.sys?.country ?? "",
        },
      }),
    },
    removeFromFavorites: (state, action) => {
      const next = state.filter((city) => city.id !== action.payload);
      persist(next);
      return next;
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
