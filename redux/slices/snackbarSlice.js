import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  autoHideDuration: 6000,
  severity: 'success',
  message: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state.open = true;
      const { severity, message, autoHideDuration } = action.payload;
      state.severity = severity;
      state.message = message;
      state.autoHideDuration = autoHideDuration;
    },
    closeSnackbar: (state) =>  {
      state.open = false;
      state.autoHideDuration = 6000;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export const selectOpen = (state) => state.snackbar.open;
export const selectAutoHideDuration = (state) => state.snackbar.autoHideDuration;
export const selectSeverity = (state) => state.snackbar.severity;
export const selectMessage = (state) => state.snackbar.message;

export default snackbarSlice.reducer;