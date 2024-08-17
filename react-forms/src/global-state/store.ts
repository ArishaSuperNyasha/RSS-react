import { configureStore } from '@reduxjs/toolkit';
import { countrySlice } from './country/country-slice';

export const store = configureStore({
  reducer: {
    country: countrySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
