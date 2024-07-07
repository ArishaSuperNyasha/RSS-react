import { Component, ReactNode, createRef } from 'react';
import { Api, TermsStorage } from '../../services';
import {
  SearchButton,
  SearchInput,
  TermsList,
} from './components';
import {
  addTermAndConvertToString,
  getTermsFromString,
} from './utils';

export class SearchPage extends Component {
  state: {
    terms: string[];
    searchResults: unknown;
    isFocus: boolean;
  } = {
    terms: this.getTerms(),
    searchResults: null,
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
    const trimmedValue = newValue.trim();
    if (trimmedValue === '') {
      return;
    }

    const searchTerms = this.getTerms();
    const newString = addTermAndConvertToString(
      searchTerms,
      trimmedValue
    );
    TermsStorage.setItem('searchTerms', newString);

    const terms = this.getTerms();

    this.setState({
      terms,
    });
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
      if (trimmedValue === '') {
        return;
      }
      this.updateSearchTerms(trimmedValue);

      Api.getCharsByName(trimmedValue).then((json) =>
        this.setState({ searchResults: json })
      );
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
    let promise;
    if (!firstTerm) {
      promise = Api.getAllChars();
    } else {
      promise = Api.getCharsByName(firstTerm);
    }
    promise.then((json) =>
      this.setState({ searchResults: json })
    );
  }

  render(): ReactNode {
    return (
      <>
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
        <div></div>
      </>
    );
  }
}
