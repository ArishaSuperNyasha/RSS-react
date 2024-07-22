import { useCallback, useEffect, useState } from 'react';
import { TermsStorage } from '../services';
import { useNavigate } from 'react-router-dom';

function getTerms(): string[] {
  return TermsStorage.getTermsArray('searchTerms');
}

export function useSearchTerms(): {
  terms: string[];
  sendSearchRequest: (
    value?: string,
    options?: {
      updateTerms: boolean;
    }
  ) => void;
} {
  const [terms, setTerms] = useState<string[]>(() =>
    getTerms()
  );

  const navigate = useNavigate();

  const updateSearchTerms = useCallback(
    function (newValue: string): void {
      const searchTerms = getTerms();
      const termsString =
        TermsStorage.addTermAndConvertToString(
          searchTerms,
          newValue
        );

      TermsStorage.setItem('searchTerms', termsString);

      const terms = getTerms();

      setTerms(terms);
    },
    [setTerms]
  );

  const sendSearchRequest = useCallback(
    (value?: string, options = { updateTerms: false }) => {
      const trimmedValue = value?.trim();
      if (
        trimmedValue !== undefined &&
        trimmedValue !== '' &&
        options.updateTerms
      ) {
        new Promise((resolve) => {
          resolve(updateSearchTerms(trimmedValue));
        }).finally(() => navigate('/1'));
      }
    },
    [navigate, updateSearchTerms]
  );

  useEffect(() => {
    const firstTerm =
      TermsStorage.getLastTerm('searchTerms');
    sendSearchRequest(firstTerm);

    return () => {
      const terms =
        TermsStorage.getTermsArray('searchTerms');
      TermsStorage.addTermAndConvertToString(
        terms,
        terms[0]
      );
    };
  }, [sendSearchRequest]);

  return {
    terms,
    sendSearchRequest,
  };
}
