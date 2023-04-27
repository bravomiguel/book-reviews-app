import { configureStore } from "@reduxjs/toolkit";
// import snackbarReducer from "../slices/snackbarSlice";
// import bookSearchReducer from "../slices/bookSearchSlice";
import offlineWarnerReducer from "../slices/offlineWarnerSlice"
import bottomNavReducer from "../slices/bottomNavSlice"

export const store = configureStore({
  reducer: {
    // snackbar: snackbarReducer,
    // bookSearch: bookSearchReducer,
    offlineWarner: offlineWarnerReducer,
    bottomNav: bottomNavReducer,
  },
});