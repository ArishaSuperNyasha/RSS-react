import { useState } from 'react';
import { ChildrenProps } from 'src/components/interfaces';
import {
  ThemeContext,
  ThemeUpdateContext,
} from './contexts';

export const ThemeProvider = (props: ChildrenProps) => {
  const [isDarkTheme, setTheme] = useState(false);

  function toggleTheme(): void {
    setTheme((isDarkTheme) => !isDarkTheme);
  }

  return (
    <ThemeContext.Provider value={isDarkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {props.children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
