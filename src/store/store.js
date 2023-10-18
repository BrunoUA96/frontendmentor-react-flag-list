import { configureStore } from '@reduxjs/toolkit';

import { countriesApi } from '../Api/api';
import filtersSlice from './slices/filtersSlice';
import themeSlice from './slices/themeSlice';

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
