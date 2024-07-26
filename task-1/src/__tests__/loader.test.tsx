import { render, screen } from '@testing-library/react';
import { Loader } from '../features';

test('Renders Loader', () => {
  render(<Loader />);
  const headline = screen.getByText('Loading...');
  expect(headline).toBeInTheDocument();
  expect(headline.className).toBe('loading-indicator');
});
