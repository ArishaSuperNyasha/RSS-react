import { render, screen } from '@testing-library/react';
import { act } from 'react';
import {
  ErrorBoundary,
  ErrorButtonWrapper,
} from 'src/features';

test('ErrorBoundary test', () => {
  const { container } = render(
    <ErrorBoundary>
      <ErrorButtonWrapper>
        <p>aaaa</p>
      </ErrorButtonWrapper>
    </ErrorBoundary>
  );
  const button = container.querySelector('button');

  act(() => {
    button?.click();
  });

  expect(
    screen.getByText('Something went wrong.')
  ).toBeInTheDocument();
});
