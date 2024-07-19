import { createSlice } from '@reduxjs/toolkit';

export interface State {
  itemsSelector: {
    items: { [key: number]: object };
  };
}

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
  },
});

export const { addItem, removeItem } =
  itemsSelectorSlice.actions;
