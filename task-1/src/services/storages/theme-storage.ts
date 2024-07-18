import { Storage } from './storage';

type ThemeStorageKeys = 'theme';

const ThemeStorage = new Storage<ThemeStorageKeys>(
  localStorage
);

export { ThemeStorage };
