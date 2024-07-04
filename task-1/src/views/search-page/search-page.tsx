import { Component, ReactNode, createRef } from 'react';
import {
  SearchButton,
  SearchInput,
  TermsList,
} from './components';

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
    if (string === '') {
      return [];
    } else {
      return (
        string
          ?.split(/(?<=") (?=")/)
          .map((s) => s.slice(1, s.length - 1)) ?? []
      );
    }
  }

  private updateSearchTerms(newValue: string): void {
    let searchTerms = this.getTerms();
    let newString: string;
    if (searchTerms.length === 0 || searchTerms[0] === '') {
      newString = `"${newValue}"`;
    } else {
      searchTerms = searchTerms
        .slice(0, 11)
        .filter((s) => s !== newValue)
        .slice(0, 10);
      newString = [newValue, ...searchTerms]
        .map((s) => `"${s}"`)
        .join(' ');
    }
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
