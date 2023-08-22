import { configureStore } from '@reduxjs/toolkit';
import carSlice from './car'
import carFilterSlice from './carFilter.js';

const store = configureStore({
  reducer: {
    car: carSlice.reducer,
    carFilter: carFilterSlice.reducer,
  }
});

export default store;