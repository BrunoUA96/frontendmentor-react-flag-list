import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  region: { value: '', label: '' },
};

export const filtersSlice = createSlice({
  name: 'Filters',
  initialState,
  reducers: {
    setSearch: (store, action) => {
      store.search = action.payload;
    },
    setRegion: (store, action) => {
      store.region = action.payload;
    },
  },
});

export const { setSearch, setRegion } = filtersSlice.actions;

export const selectedFilters = state => state.filters;

export default filtersSlice.reducer;
