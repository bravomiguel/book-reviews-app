import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bnValue: null,
  bnDisplay: 'flex',
  bnMargin: '8em',
};

const bottomNavSlice = createSlice({
  name: 'bottomNav',
  initialState,
  reducers: {
    setBnValue: (state, action) => {
      state.bnValue = action.payload;
    },
    setBnDisplay: (state, action) => {
      state.bnDisplay = action.payload;
    },
    setBnMargin: (state, action) => {
      state.bnMargin = action.payload;
    }
  },
});

export const { setBnValue, setBnDisplay, setBnMargin } = bottomNavSlice.actions;

export const selectBnValue = (state) => state.bottomNav.bnValue;
export const selectBnDisplay = (state) => state.bottomNav.bnDisplay;
export const selectBnMargin = (state) => state.bottomNav.bnMargin;

export default bottomNavSlice.reducer;
