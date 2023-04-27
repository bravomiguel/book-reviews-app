import { createSlice } from '@reduxjs/toolkit';

// const onlineInitialStatus = () => {
//   if (!window) return 'offline';
//   return window.navigator.onLine ? 'online' : 'offline';
// };

const initialState = {
  online: "online",
};

const offlineWarnerSlice = createSlice({
  name: 'offlineWarner',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      const isOnline = action.payload;
      if (isOnline) {
        state.online = true;
        return;
      }
      state.online = false;
    },
  },
});

export const { setStatus } = offlineWarnerSlice.actions;

export const selectOnline = (state) => state.offlineWarner.online;

export default offlineWarnerSlice.reducer;