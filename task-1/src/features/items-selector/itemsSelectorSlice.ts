import { createSlice } from '@reduxjs/toolkit';

export interface State {
  itemsSelector: {
    items: object[];
  };
}

const initialState = {
  items: [],
};

export const itemsSelectorSlice = createSlice({
  name: 'itemsSelector',
  initialState,
  reducers: {
    addItem: (state: State['itemsSelector'], action) => {
      state.items.push(action.payload);
      console.log(state.items, action);
    },
  },
});

export const { addItem } = itemsSelectorSlice.actions;
