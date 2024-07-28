import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import {
  TermsList,
  TermsListProps,
} from 'src/views/search-page/components';

let s: string;
const termsListProps: Required<TermsListProps> = {
  className: 'terms-list',
  terms: ['abc', 'bcd', 'cde'],
  callback: (text: string) => (s = text),
};

describe('TermsList test', () => {
  it('Renders TermsList', () => {
    render(<TermsList {...termsListProps}></TermsList>);
    const li = screen.getByText(termsListProps.terms[1]);
    expect(li).toBeInTheDocument();
  }),
    it('Callback on mouse down', () => {
      render(<TermsList {...termsListProps}></TermsList>);
      const li = screen.getByText(termsListProps.terms[1]);
      fireEvent.mouseDown(li);
      expect(s).toBe('');
    });
});
