import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { SearchPage } from 'src/views';
import { AllCharsData } from 'src/services';

import 'src/features/drawer/createObjectUrl';
import 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'src/app';

const dataMock: AllCharsData = {
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
    {
      allies: [],
      createdAt: '01.01.2001',
      enemies: [],
      films: [],
      imageUrl: 'kikikiki.jpg',
      name: 'Ki Ki',
      parkAttractions: [],
      shortFilms: [],
      sourceUrl: '',
      tvShows: ['Ki Ki The Pig', 'Ki Ki The Pig Common!'],
      updatedAt: '',
      url: 'fgntrasvvr',
      videoGames: [],
      _id: 701,
    },
  ],
  info: {
    count: 3,
    nextPage: null,
    previousPage: null,
    totalPages: 1,
  },
};

vi.mock('react-router-dom', async () => {
  return {
    NavLink: () => <a></a>,
    Link: () => <a></a>,
    useLoaderData: () => dataMock,
    useLocation: () => 1,
    useNavigate: () => 1,
  };
});

vi.mock('src/features/drawer/createObjectUrl', () => {
  return {
    createObjectURL: () => 1,
  };
});

test('Draws the Search page', () => {
  render(
    <Provider store={store}>
      <SearchPage></SearchPage>
    </Provider>
  );
  expect(
    screen.getByText('Disney Heroes')
  ).toBeInTheDocument();
});
