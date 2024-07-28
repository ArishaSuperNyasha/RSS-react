import { useContext } from 'react';
import { ChildrenProps } from '../interfaces';
import { ThemeContext, ThemeUpdateContext } from '..';
import './style.css';

export const ThemeButtonWrapper = (
  props: ChildrenProps
) => {
  const theme = useContext(ThemeContext);
  const themeToggler = useContext(ThemeUpdateContext);

  return (
    <div
      className={`theme-button-wrapper ${theme ? 'light' : 'dark'}`}
    >
      <input
        type='checkbox'
        id='switch-theme'
        onChange={() => {
          if (themeToggler) {
            themeToggler();
          }
        }}
      />
      <label htmlFor='switch-theme'></label>
      {props.children}
    </div>
  );
};
