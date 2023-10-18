import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { countriesApi } from '../Api/api';
import filtersSlice from './slices/filtersSlice';
import paginationSlice from './slices/paginationSlice';
import themeSlice from './slices/themeSlice';

const rootReducers = combineReducers({
  filters: filtersSlice,
  theme: themeSlice,
  pagination: paginationSlice,
  [countriesApi.reducerPath]: countriesApi.reducer,
});

const persistConfig = {
  key: 'countries-theme',
  storage,
  whiteList: ['filters'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  // @ts-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(countriesApi.middleware),
});

export const persistor = persistStore(store);
