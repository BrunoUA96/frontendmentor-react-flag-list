import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    setTheme: (store, action) => {
      store.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectedTheme = store => store.theme;
export default themeSlice.reducer;
