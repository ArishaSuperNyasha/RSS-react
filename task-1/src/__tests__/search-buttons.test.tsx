import { render, screen } from '@testing-library/react';
import { SearchButton } from '../views/search-page/components/search-button';

test('Renders button with onclick props', () => {
  let i = 0;
  render(
    <SearchButton onClick={() => (i += 1)}></SearchButton>
  );
  const button = screen.getByText('Search');
  button.click();
  expect(i).toEqual(1);
});
