import { ChildrenProps } from '../interfaces';
import './style.css';

export const ErrorButtonWrapper = (
  props: ChildrenProps
) => {
  const onClick = () => {
    throw new Error(
      `It's code generated error, don't worry`
    );
  };

  return (
    <div className='error-button-wrapper'>
      <button onClick={onClick}>Generate Error</button>
      {props.children}
    </div>
  );
};
