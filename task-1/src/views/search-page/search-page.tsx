import { Component, ReactNode } from 'react';
import { SearchButton, SearchInput } from './components';

export class SearchPage extends Component {
  render(): ReactNode {
    return (
      <>
        <SearchInput />
        <SearchButton />
      </>
    );
  }
}
