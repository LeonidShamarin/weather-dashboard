import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "units";

function loadUnits() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "imperial" ? "imperial" : "metric";
  } catch {
    return "metric";
  }
}

const unitsSlice = createSlice({
  name: "units",
  initialState: loadUnits(),
  reducers: {
    setUnits: (_state, action) => {
      const next = action.payload === "imperial" ? "imperial" : "metric";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    },
  },
});

export const { setUnits } = unitsSlice.actions;
export default unitsSlice.reducer;
