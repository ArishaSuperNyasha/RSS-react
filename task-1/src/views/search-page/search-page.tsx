import { useCallback, useEffect, useState } from 'react';
import {
  Api,
  TermsStorage,
  AllCharsData,
} from '../../services';
import {
  SearchButton,
  SearchInput,
  SearchResults,
  TermsList,
} from './components';
import {
  addTermAndConvertToString,
  getTermsFromString,
  getInputValue as getValue,
  pasteValueIntoInput as pasteValue,
} from './utils';
import './style.css';

function getTerms(): string[] {
  const string = TermsStorage.getItem('searchTerms');
  return getTermsFromString(string);
}

let inputRef: null | HTMLInputElement = null;

const handleLiClick = (text: string) => {
  pasteValue(inputRef, text);
};

export const SearchPage = () => {
  const [terms, setTerms] = useState<string[]>(() =>
    getTerms()
  );
  const [searchResults, setSearchResults] = useState<
    AllCharsData | undefined
  >(undefined);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const updateSearchTerms = useCallback(
    function (newValue: string): void {
      const searchTerms = getTerms();
      const newString = addTermAndConvertToString(
        searchTerms,
        newValue
      );
      TermsStorage.setItem('searchTerms', newString);

      const terms = getTerms();

      setTerms(terms);
    },
    [setTerms]
  );

  const sendSearchRequest = useCallback(
    (value?: string, options = { updateTerms: false }) => {
      const trimmedValue = value?.trim();
      let promise;
      if (
        trimmedValue === undefined ||
        trimmedValue === ''
      ) {
        promise = Api.getAllChars();
      } else {
        if (options.updateTerms) {
          updateSearchTerms(trimmedValue);
        }
        promise = Api.getCharsByName(trimmedValue);
      }
      promise.then((json) => setSearchResults(json));
    },
    [updateSearchTerms]
  );

  useEffect(() => {
    const firstTerm = getTerms()[0];
    sendSearchRequest(firstTerm);
  }, [sendSearchRequest]);

  const onFocus: React.FormEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const isFocus = event.type === 'focus';
        setIsFocus(isFocus);
      },
      [setIsFocus]
    );

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      async (event) => {
        event.preventDefault();

        const newValue = getValue(inputRef);
        const trimmedValue = newValue.trim();
        if (trimmedValue !== '') {
          updateSearchTerms(trimmedValue);
        }

        sendSearchRequest(trimmedValue, {
          updateTerms: true,
        });
      },
      [updateSearchTerms, sendSearchRequest]
    );

  return (
    <div className='search-page'>
      <h1>Disney Heroes</h1>
      <form>
        <SearchInput
          onFocus={onFocus}
          onBlur={onFocus}
          inputRef={(elem) => (inputRef = elem)}
        />
        <SearchButton onClick={handleButtonClick} />
        <TermsList
          callback={handleLiClick}
          className={isFocus ? '' : 'hidden'}
          terms={terms}
        />
      </form>
      <SearchResults
        searchResults={searchResults}
        className='results'
      ></SearchResults>
    </div>
  );
};
