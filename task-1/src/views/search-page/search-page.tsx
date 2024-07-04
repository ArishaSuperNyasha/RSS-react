import { Component, ReactNode } from 'react';
import {
  SearchButton,
  SearchInput,
  TermsList,
} from './components';

export class SearchPage extends Component {
  render(): ReactNode {
    return (
      <>
        <SearchInput />
        <SearchButton />
        <TermsList
          terms={Array.from({ length: 10 }, () => 'abcd')}
        />
      </>
    );
  }
}
