import { AllCharsData, OneCharData } from './interfaces';
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const pageSize = 10;

export interface GetAllCharsParams {
  pageNumber: number;
}

export interface GetCharsByNameParams {
  name: string;
  pageNumber: number;
}

export interface GetCharByIdParams {
  idEndpoint: number;
}

export const disneyApi = createApi({
  reducerPath: 'disneyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.disneyapi.dev',
  }),
  endpoints: (build) => ({
    getAllChars: build.query<
      AllCharsData,
      GetAllCharsParams
    >({
      query: ({ pageNumber }) =>
        `/character?page=${pageNumber}&pageSize=${pageSize}`,
    }),
    getCharsByName: build.query<
      AllCharsData,
      GetCharsByNameParams
    >({
      query: ({ name, pageNumber }) =>
        `/character?name=${name}&page=${pageNumber}&pageSize=${pageSize}`,
    }),
    getCharById: build.query<
      OneCharData,
      GetCharByIdParams
    >({
      query: ({ idEndpoint }) => `/character/${idEndpoint}`,
    }),
  }),
});
