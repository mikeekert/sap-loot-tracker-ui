import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    scriptsReady: false,
  },
  reducers: {
    scriptsLoaded: (state) => {
      state.scriptsReady = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { scriptsLoaded } = appSlice.actions;

export default appSlice.reducer;
