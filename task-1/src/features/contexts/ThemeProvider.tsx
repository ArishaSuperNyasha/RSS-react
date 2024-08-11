import { useEffect, useState } from 'react';
import { ChildrenProps } from 'src/features';
import {
  ThemeContext,
  ThemeUpdateContext,
} from './contexts';
import { ThemeStorage } from 'src/services';

export const ThemeProvider = (props: ChildrenProps) => {
  const [isDarkTheme, setTheme] = useState(false);

  useEffect(() => {
    const storageTheme =
      ThemeStorage.getItem('theme') === 'true';
    setTheme(storageTheme);

    return () => {
      setTheme(isDarkTheme);
    };
  }, [isDarkTheme, setTheme]);

  function toggleTheme(): void {
    const newValue = !isDarkTheme;
    setTheme(newValue);
    ThemeStorage.setItem('theme', newValue.toString());
  }

  return (
    <ThemeContext.Provider value={isDarkTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {props.children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
