import { render, screen } from '@testing-library/react';
import {
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import { routerConfig } from 'src/router';

test('Shows the Main page', async () => {
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);
  return setTimeout(() => {
    expect(
      screen.getByText('Disney Heroes')
    ).toBeInTheDocument();
  }, 500);
});

test('Shows 404 page on errors', async () => {
  const router = createMemoryRouter(routerConfig, {
    initialEntries: ['/abc'],
  });

  render(<RouterProvider router={router} />);
  return setTimeout(() => {
    expect(screen.getByText('Oops!')).toBeInTheDocument();
  }, 500);
});
