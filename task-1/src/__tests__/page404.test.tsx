import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Page404 } from 'src/views';
import 'react-router-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  await importOriginal();
  return {
    useRouteError: () =>
      new SyntaxError('Misspell location'),
    isRouteErrorResponse: (error: unknown) =>
      !(error instanceof Error),
  };
});

test('Draws correct 404 page when error orrurs', () => {
  render(<Page404></Page404>);
  expect(
    screen.getByText('SyntaxError')
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      'Sorry, an unexpected error has occurred.'
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText('Misspell location')
  ).toBeInTheDocument();
});
