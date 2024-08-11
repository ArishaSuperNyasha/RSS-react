import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'src/app';
import {
  SearchResults,
  SearchResultsProps,
} from 'src/views/search-page/components';

const searchResultsProps: SearchResultsProps = {
  searchResults: {
    data: [
      {
        allies: [],
        createdAt: '01.01.2001',
        enemies: [],
        films: [],
        imageUrl: 'sdbsbsbsdhsac.jpg',
        name: 'Qua Qua',
        parkAttractions: [],
        shortFilms: [],
        sourceUrl: '',
        tvShows: [
          'Qua Qua The Duck',
          'Qua Qua The Duck Common!',
        ],
        updatedAt: '',
        url: 'savbtrtmr',
        videoGames: [],
        _id: 100,
      },
      {
        allies: [],
        createdAt: '01.01.2001',
        enemies: [],
        films: [],
        imageUrl: 'nfhbbsdhsac.jpg',
        name: 'Bla Bla',
        parkAttractions: [],
        shortFilms: [],
        sourceUrl: '',
        tvShows: [
          'Bla Bla The Frog',
          'Bla Bla The Frog Common!',
        ],
        updatedAt: '',
        url: 'savbtrtmr',
        videoGames: [],
        _id: 151,
      },
    ],
    info: {
      count: 2,
      nextPage: null,
      previousPage: null,
      totalPages: 1,
    },
  },
};

describe('SearchResults test', () => {
  it('Renders SearchResults', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults
            {...searchResultsProps}
          ></SearchResults>
        </Provider>
      </MemoryRouter>
    );
    const name1 = screen.getByText(
      searchResultsProps.searchResults?.data[0].name ?? ''
    );
    const name2 = screen.getByText(
      searchResultsProps.searchResults?.data[1].name ?? ''
    );
    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
  });
});
