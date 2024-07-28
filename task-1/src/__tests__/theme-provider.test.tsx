import { render } from '@testing-library/react';
import {
  ThemeButtonWrapper,
  ThemeProvider,
} from 'src/features';

const jsx = (
  <ThemeProvider>
    <ThemeButtonWrapper>
      <p>aaaa</p>
    </ThemeButtonWrapper>
  </ThemeProvider>
);

describe('Theme context test', () => {
  it('Renders ThemeProvider', () => {
    const { container } = render(jsx);
    expect(container).toBeInTheDocument();
  }),
    it('Switches theme on click', () => {
      const { container } = render(jsx);
      const themeWrapper = container.querySelector(
        '.theme-button-wrapper'
      );
      expect(themeWrapper).toBeInTheDocument();

      const button = container.querySelector('button');
      button?.click();
      expect(themeWrapper?.className).toBe(
        'theme-button-wrapper dark'
      );
    });
});
