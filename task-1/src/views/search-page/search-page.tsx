import { Component, ReactNode, createRef } from 'react';
import { TermsStorage } from '../../services';
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
    isFocus: boolean;
  } = {
    terms: this.getTerms(),
    isFocus: false,
  };

  private inputRef: React.RefObject<SearchInput> =
    createRef();

  private termsRef: React.RefObject<TermsList> =
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

  private onFocus: React.FormEventHandler<HTMLInputElement> =
    (event) => {
      const isFocus = event.type === 'focus';
      this.setState({ isFocus });
    };

  private handleButtonClick: React.MouseEventHandler<HTMLButtonElement> =
    () => {
      const newValue = this.inputValue;
      this.updateSearchTerms(newValue);
    };

  private handleInput: React.FormEventHandler<HTMLInputElement> =
    () => {
      const inputValue = this.inputRef.current?.getValue();
      if (!inputValue) {
        return;
      }

      this.inputValue = inputValue;
    };

  render(): ReactNode {
    return (
      <>
        <SearchInput
          onInput={this.handleInput}
          onFocus={this.onFocus}
          onBlur={this.onFocus}
          ref={this.inputRef}
        />
        <SearchButton onClick={this.handleButtonClick} />
        <TermsList
          ref={this.termsRef}
          className={this.state.isFocus ? '' : 'hidden'}
          terms={this.state.terms}
        />
      </>
    );
  }
}
