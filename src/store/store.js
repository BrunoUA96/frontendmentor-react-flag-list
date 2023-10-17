import { configureStore } from '@reduxjs/toolkit';

import { countriesApi } from '../Api/api';
import filtersSlice from './filtersSlice';

export const store = configureStore({
  reducer: {
    // @ts-ignore
    filters: filtersSlice,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  // @ts-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});
