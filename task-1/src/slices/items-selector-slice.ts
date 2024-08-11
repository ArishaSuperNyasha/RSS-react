import { createSlice } from '@reduxjs/toolkit';
import { State } from './state-interface';

const initialState = {
  items: {},
};

export const itemsSelectorSlice = createSlice({
  name: 'itemsSelector',
  initialState,
  reducers: {
    addItem: (state: State['itemsSelector'], action) => {
      const id = action.payload._id;
      if (!id || typeof id !== 'number') return;

      state.items[id] = action.payload;
    },
    removeItem: (state: State['itemsSelector'], action) => {
      const id = action.payload;
      if (!id || typeof id !== 'number') return;

      delete state.items[id];
    },
    removeAll: (state: State['itemsSelector']) => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, removeAll } =
  itemsSelectorSlice.actions;
