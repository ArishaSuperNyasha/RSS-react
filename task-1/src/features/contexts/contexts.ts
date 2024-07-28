import { createContext } from 'react';

export const ThemeContext = createContext(false);
export const ThemeUpdateContext = createContext<
  null | (() => void)
>(null);
