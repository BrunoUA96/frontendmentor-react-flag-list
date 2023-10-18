import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
};

export const paginationSlice = createSlice({
  name: 'Pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export const selectedPage = state => state.pagination;

export default paginationSlice.reducer;
