import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReduxFormsState } from '../utils';

interface FormsState {
  value: ReduxFormsState;
}

const initialState: FormsState = {
  value: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<ReduxFormsState[number]>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addForm } = formsSlice.actions;
