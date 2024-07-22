import { Params } from 'react-router-dom';
import {
  AllCharsData,
  GetAllCharsParams,
  GetCharsByNameParams,
  TermsStorage,
  disneyApi,
} from '../services';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryMeta,
  QueryActionCreatorResult,
  QueryDefinition,
} from '@reduxjs/toolkit/query';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { store } from 'src/app/store';

export const resultsLoader = async ({
  params,
}: {
  params: Params<'pageNumber' | 'characterId'>;
}): Promise<AllCharsData> => {
  const name = TermsStorage.getLastTerm('searchTerms');
  const pageNumber = parseInt(params.pageNumber ?? '1');

  if (isNaN(pageNumber)) {
    throw new Response('The page was not found', {
      status: 404,
    });
  }

  let promise: QueryActionCreatorResult<
    QueryDefinition<
      GetCharsByNameParams | GetAllCharsParams,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      never,
      AllCharsData,
      'disneyApi'
    >
  >;
  if (name === '') {
    promise = store.dispatch(
      disneyApi.endpoints.getAllChars.initiate({
        pageNumber,
      })
    );
  } else {
    promise = store.dispatch(
      disneyApi.endpoints.getCharsByName.initiate({
        pageNumber,
        name,
      })
    );
  }

  try {
    const response = await promise.unwrap();

    if (response.data.length === 0) {
      throw new Error();
    }
    return response;
  } catch (e) {
    throw new Response('The page was not found', {
      status: 404,
    });
  } finally {
    promise.unsubscribe();
  }
};
