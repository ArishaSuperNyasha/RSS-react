import { useState } from 'react';
import { ChildrenProps } from '../interfaces';
import './style.css';

export const ErrorButtonWrapper = (
  props: ChildrenProps
) => {
  const [hasErrror, setError] = useState<boolean>(false);

  if (hasErrror) {
    throw new Error(
      `It's code generated error, don't worry`
    );
  }
  return (
    <div className='error-button-wrapper'>
      <button onClick={() => setError(true)}>
        Generate Error
      </button>
      {props.children}
    </div>
  );
};
