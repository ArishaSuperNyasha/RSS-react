import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { App } from 'src/app';
import 'react-router-dom';
import 'src/views/search-page';

vi.mock('react-router-dom', async (importOriginal) => {
  await importOriginal();
  return {
    useNavigation: () => ({
      state: 'loading',
      location: {
        pathname: 'characters',
      },
    }),
    useLoaderData: () => ({}),
  };
});

vi.mock('src/views/search-page', () => ({
  SearchPage: () => <div></div>,
}));

test('Shows the loading indicator until the request is resolved', () => {
  render(<App></App>);
  expect(
    screen.getByText('Loading...')
  ).toBeInTheDocument();
});
