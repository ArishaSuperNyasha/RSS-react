import { Component, ReactNode, createRef } from 'react';
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
    terms?: string[];
  } = {
    terms: this.getTerms(),
  };

  private inputRef: React.RefObject<SearchInput> =
    createRef();

  private inputValue = '';

  private getTerms(): string[] {
    const string = localStorage.getItem('searchTerms');
    return getTermsFromString(string);
  }

  private updateSearchTerms(newValue: string): void {
    const searchTerms = this.getTerms();
    const newString = addTermAndConvertToString(
      searchTerms,
      newValue
    );
    localStorage.setItem('searchTerms', newString);

    const terms = this.getTerms();

    this.setState({
      terms,
    });
  }

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
          ref={this.inputRef}
        />
        <SearchButton onClick={this.handleButtonClick} />
        <TermsList terms={this.state.terms} />
      </>
    );
  }
}
