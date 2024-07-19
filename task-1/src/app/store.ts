import { configureStore } from '@reduxjs/toolkit';
import { itemsSelectorSlice } from 'src/features';

export const store = configureStore({
  reducer: {
    itemsSelector: itemsSelectorSlice.reducer,
  },
});
