import { configureStore } from '@reduxjs/toolkit';
import {
  itemsSelectorSlice,
  pageItemsSlice,
} from 'src/features';

export const store = configureStore({
  reducer: {
    itemsSelector: itemsSelectorSlice.reducer,
    endpoint: pageItemsSlice.reducer,
  },
});
