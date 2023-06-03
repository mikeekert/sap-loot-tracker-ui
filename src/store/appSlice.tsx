import { createSlice } from "@reduxjs/toolkit";

export enum RollTypeEnum {
  BIS = 0,
  UPGRADE,
  TIER,
  FLEX,
  TRANSMOG,
}

export enum RaidDifficultyEnum {
  NORMAL = 0,
  HEROIC,
  MYTHIC,
}

export interface AppFilters {
  raidDifficulty: { [key: number]: boolean };
  rollType: { [key: number]: boolean };
}

export const appSlice = createSlice({
  name: "app",
  initialState: {
    scriptsReady: false,
    filters: {
      raidDifficulty: {
        0: true,
        1: true,
        2: true,
      },
      rollType: {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
      },
    },
  },
  reducers: {
    scriptsLoaded: (state) => {
      state.scriptsReady = true;
    },
    setRaidDifficulty: (state, action) => {
      state.filters.raidDifficulty = action.payload;
    },
    setRType: (state, action) => {
      state.filters.rollType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { scriptsLoaded, setRType, setRaidDifficulty } = appSlice.actions;

export default appSlice.reducer;
