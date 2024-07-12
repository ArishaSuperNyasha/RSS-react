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
  const { pageNumber } = params;
  const name = TermsStorage.getLastTerm('searchTerms');
  if (!pageNumber || !name) {
    return null;
  }
  const results = await Api.getCharsByName(
    name,
    parseInt(pageNumber)
  );
  return { results };
};
