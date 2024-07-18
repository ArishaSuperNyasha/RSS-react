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
      className={`theme-button-wrapper ${theme ? 'dark' : 'light'}`}
    >
      <button
        onClick={() => {
          if (themeToggler) {
            themeToggler();
          }
        }}
      ></button>
      {props.children}
    </div>
  );
};
