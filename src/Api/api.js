// import { ALL_COUNTRIES } from '@/Api/config';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// export const countriesApi = createApi({
//   reducerPath: 'countiesApi',
//   baseQuery: fetchBaseQuery({ baseUrl: ALL_COUNTRIES }),
//   endpoints: builder => ({
//     getCountries: builder.query({
//       query: () => '',
//     }),
//   }),
// });
// export const { useGetCountriesQuery } = countriesApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countriesApi = createApi({
  reducerPath: 'countiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v2' }),
  endpoints: builder => ({
    getCountries: builder.query({
      query: () => {
        return {
          url: 'all',
          params: {
            fields: ['name', 'population', 'region', 'capital', 'flags'],
          },
        };
      },
    }),
    getCountry: builder.query({
      query: name => `name/${name}`,
    }),
  }),
});

export const { useGetCountriesQuery, useGetCountryQuery } = countriesApi;
