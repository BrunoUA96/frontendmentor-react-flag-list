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
    getBorderCountries: builder.query({
      query: params => {
        return {
          url: 'alpha',
          params: { codes: [...params] },
        };
      },
      transformResponse: (response = []) => {
        // @ts-ignore
        return response.map(res => res.name);
      },
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetCountryQuery,
  useGetBorderCountriesQuery,
} = countriesApi;
