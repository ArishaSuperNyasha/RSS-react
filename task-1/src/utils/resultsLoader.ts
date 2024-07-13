import { Params } from 'react-router-dom';
import {
  AllCharsData,
  Api,
  TermsStorage,
} from '../services';

export type ResultsLoaderReturnType = {
  results: AllCharsData;
} | null;

export const resultsLoader = async ({
  params,
}: {
  params: Params<'pageNumber'>;
}): Promise<ResultsLoaderReturnType> => {
  const name = TermsStorage.getLastTerm('searchTerms');
  const pageNumber = parseInt(params.pageNumber ?? '1');

  let promise;
  if (name === '') {
    promise = Api.getAllChars(pageNumber);
  } else {
    promise = Api.getCharsByName(name, pageNumber);
  }

  const results = await promise;
  return { results };
};
