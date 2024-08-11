import { createSlice } from '@reduxjs/toolkit';
import { State } from './state-interface';

const initialState = {
  items: [],
};

export const pageItemsSlice = createSlice({
  name: 'pageItems',
  initialState,
  reducers: {
    addItems: (state: State['pageItems'], action) => {
      const data = action.payload;
      if (
        !(Array.isArray(data) && data[0] instanceof Object)
      )
        return;

      state.items = data;
    },
  },
});

export const { addItems } = pageItemsSlice.actions;
