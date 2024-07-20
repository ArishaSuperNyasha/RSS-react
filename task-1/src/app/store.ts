import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  itemsSelectorSlice,
  pageItemsSlice,
} from 'src/features';
import { disneyApi } from 'src/services';

export const store = configureStore({
  reducer: {
    [disneyApi.reducerPath]: disneyApi.reducer,
    itemsSelector: itemsSelectorSlice.reducer,
    endpoint: pageItemsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(disneyApi.middleware),
});

setupListeners(store.dispatch);
