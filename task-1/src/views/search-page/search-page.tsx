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
} from './utils';
import './style.css';

function getTerms(): string[] {
  const string = TermsStorage.getItem('searchTerms');
  return getTermsFromString(string);
}

export const SearchPage = () => {
  const [terms, setTerms] = useState<string[]>(() =>
    getTerms()
  );
  const [searchResults, setSearchResults] = useState<
    AllCharsData | undefined
  >(undefined);
  const [isFocus, setIsFocus] = useState<boolean>(false);

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
    []
  );

  useEffect(() => {
    const firstTerm = getTerms()[0];
    sendSearchRequest(firstTerm);
    console.log('Only once');
  }, [sendSearchRequest]);

  let inputRef: null | HTMLInputElement = null;

  function getValue(): string {
    return inputRef?.value ?? '';
  }

  function pasteValue(stroke: string): void {
    const inputElement = inputRef;
    if (inputElement) {
      inputElement.value = stroke;
    }
  }

  function updateSearchTerms(newValue: string): void {
    const searchTerms = getTerms();
    const newString = addTermAndConvertToString(
      searchTerms,
      newValue
    );
    TermsStorage.setItem('searchTerms', newString);

    const terms = getTerms();

    setTerms(terms);
  }

  const onFocus: React.FormEventHandler<
    HTMLInputElement
  > = (event) => {
    const isFocus = event.type === 'focus';
    setIsFocus(isFocus);
  };

  const handleButtonClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    event.preventDefault();

    const newValue = getValue();
    const trimmedValue = newValue.trim();
    if (trimmedValue !== '') {
      updateSearchTerms(trimmedValue);
    }

    sendSearchRequest(trimmedValue, {
      updateTerms: true,
    });
  };

  const handleLiClick = (text: string) => {
    pasteValue(text);
  };

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
