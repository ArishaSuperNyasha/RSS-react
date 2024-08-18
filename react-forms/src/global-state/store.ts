import { configureStore } from '@reduxjs/toolkit';
import { countrySlice } from './country/country-slice';
import { formsSlice } from './forms-slice';

export const store = configureStore({
  reducer: {
    country: countrySlice.reducer,
    forms: formsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
