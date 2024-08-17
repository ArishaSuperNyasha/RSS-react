import { createSlice } from '@reduxjs/toolkit';
import { countryList } from './counries-list';

interface CountryState {
  value: string[];
}

const initialState: CountryState = {
  value: countryList,
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});
