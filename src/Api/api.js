import { ALL_COUNTRIES } from '@/config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countriesApi = createApi({
  reducerPath: 'countiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: ALL_COUNTRIES }),
  endpoints: builder => ({
    getCountries: builder.query({
      query: () => '',
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;
