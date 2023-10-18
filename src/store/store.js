import { configureStore } from '@reduxjs/toolkit';

import { countriesApi } from '../Api/api';
import filtersSlice from './filtersSlice';
import themeSlice from './themeSlice';

export const store = configureStore({
  reducer: {
    // @ts-ignore
    filters: filtersSlice,
    theme: themeSlice,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  // @ts-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});
