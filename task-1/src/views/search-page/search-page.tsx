import { Component, ReactNode, createRef } from 'react';
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

export class SearchPage extends Component {
  state: {
    terms: string[];
    searchResults?: AllCharsData;
    isFocus: boolean;
  } = {
    terms: this.getTerms(),
    searchResults: undefined,
    isFocus: false,
  };

  private inputRef: React.RefObject<SearchInput> =
    createRef();

  private termsRef: React.RefObject<TermsList> =
    createRef();

  private buttonRef: React.RefObject<SearchButton> =
    createRef();

  private inputValue = '';

  private getTerms(): string[] {
    const string = TermsStorage.getItem('searchTerms');
    return getTermsFromString(string);
  }

  private updateSearchTerms(newValue: string): void {
    const searchTerms = this.getTerms();
    const newString = addTermAndConvertToString(
      searchTerms,
      newValue
    );
    TermsStorage.setItem('searchTerms', newString);

    const terms = this.getTerms();

    this.setState({
      terms,
    });
  }

  private sendSearchRequest(
    value?: string,
    options = { updateTerms: false }
  ): void {
    const trimmedValue = value?.trim();
    let promise;
    if (trimmedValue === undefined || trimmedValue === '') {
      promise = Api.getAllChars();
    } else {
      if (options.updateTerms) {
        this.updateSearchTerms(trimmedValue);
      }
      promise = Api.getCharsByName(trimmedValue);
    }
    promise.then((json) =>
      this.setState({ searchResults: json })
    );
  }

  private onFocus: React.FormEventHandler<HTMLInputElement> =
    (event) => {
      const isFocus = event.type === 'focus';
      this.setState({ isFocus });
    };

  private handleButtonClick: React.MouseEventHandler<HTMLButtonElement> =
    async (event) => {
      event.preventDefault();

      const newValue = this.inputValue;
      const trimmedValue = newValue.trim();
      if (trimmedValue !== '') {
        this.updateSearchTerms(trimmedValue);
      }

      this.sendSearchRequest(trimmedValue, {
        updateTerms: true,
      });
    };

  private handleInput: React.FormEventHandler<HTMLInputElement> =
    () => {
      const inputValue = this.inputRef.current?.getValue();
      if (!inputValue) {
        return;
      }

      this.inputValue = inputValue;
    };

  private handleLiClick = (text: string) => {
    this.inputRef.current?.inputValue(text);
    this.inputValue = text;
  };

  componentDidMount(): void {
    const firstTerm = this.getTerms()[0];
    this.sendSearchRequest(firstTerm);
  }

  render(): ReactNode {
    return (
      <div className="search-page">
        <h1>Disney Heroes</h1>
        <form>
          <SearchInput
            onFocus={this.onFocus}
            onBlur={this.onFocus}
            onInput={this.handleInput}
            ref={this.inputRef}
          />
          <SearchButton
            ref={this.buttonRef}
            onClick={this.handleButtonClick}
          />
          <TermsList
            callback={this.handleLiClick}
            ref={this.termsRef}
            className={this.state.isFocus ? '' : 'hidden'}
            terms={this.state.terms}
          />
        </form>
        <SearchResults
          searchResults={this.state.searchResults}
          className="results"
        ></SearchResults>
      </div>
    );
  }
}
