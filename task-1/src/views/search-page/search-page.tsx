import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  SearchButton,
  SearchInput,
  SearchResults,
  TermsList,
} from './components';
import {
  getInputValue as getValue,
  pasteValueIntoInput as pasteValue,
} from './utils';
import './style.css';
import { Drawer, Pagination } from 'src/features';
import {
  useCharactersClose,
  useSearchTerms,
} from '../../hooks';
import { AllCharsData } from 'src/services';
import { addItems } from 'src/slices';

let inputRef: null | HTMLInputElement = null;

const handleLiClick = (text: string) => {
  pasteValue(inputRef, text);
};

export const SearchPage = () => {
  const data = useLoaderData() as AllCharsData;
  const totalPages = useMemo(
    () => data?.info.totalPages ?? 10,
    [data]
  );
  const results = useMemo(() => data, [data]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addItems(results.data));
  }, [dispatch, results]);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const { closeCharacters } = useCharactersClose();
  const { terms, sendSearchRequest } = useSearchTerms();

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

        sendSearchRequest(newValue, {
          updateTerms: true,
        });
      },
      [sendSearchRequest]
    );

  return (
    <div
      className='search'
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest('a')) {
          closeCharacters();
        }
      }}
    >
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
        searchResults={results}
        className='results'
      ></SearchResults>
      <Pagination
        buttonsCount={5}
        totalPages={totalPages ?? 10}
      />
      <Drawer></Drawer>
    </div>
  );
};
