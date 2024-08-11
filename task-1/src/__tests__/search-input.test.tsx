import { render } from '@testing-library/react';
import { SearchInput } from '../views/search-page/components/search-input';

describe('Search-input test', () => {
  it('Renders input', () => {
    const { container } = render(
      <SearchInput></SearchInput>
    );
    const inputElement = container.querySelector('input');
    expect(inputElement).toBeInTheDocument();
  }),
    it('Renders input with onFocus prop', () => {
      let i;
      const { container } = render(
        <SearchInput
          onFocus={() => (i = 'input')}
        ></SearchInput>
      );
      const inputElement = container.querySelector('input');
      inputElement?.focus();
      expect(i).toEqual('input');
    });
});
