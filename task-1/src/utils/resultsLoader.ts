import { Params, redirect } from 'react-router-dom';
import {
  AllCharsData,
  Api,
  TermsStorage,
} from '../services';

export type ResultsLoaderReturnType = {
  results: AllCharsData;
} | null;

const cache = new Map<string, AllCharsData>();

export const resultsLoader = async ({
  params,
}: {
  params: Params<'pageNumber'>;
}): Promise<ResultsLoaderReturnType> => {
  const name = TermsStorage.getLastTerm('searchTerms');
  const pageNumber = parseInt(params.pageNumber ?? '1');

  if (isNaN(pageNumber)) {
    throw redirect('/1');
  }

  const mapKey = `${name}/${pageNumber}`;
  const cacheValue = cache.get(mapKey);
  if (cacheValue) {
    return { results: cacheValue };
  }

  let promise;
  if (name === '') {
    promise = Api.getAllChars(pageNumber);
  } else {
    promise = Api.getCharsByName(name, pageNumber);
  }

  const results = await promise;
  cache.set(mapKey, results);
  return { results };
};
