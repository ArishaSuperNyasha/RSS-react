import React, { useCallback, useRef } from 'react';

interface TermsListProps {
  className?: string;
  terms?: string[];
  callback?: (text: string) => void;
}

export const TermsList = (props: TermsListProps) => {
  const ulRef: React.RefObject<HTMLUListElement> =
    useRef(null);

  const handleClick: React.MouseEventHandler<HTMLLIElement> =
    useCallback(
      (event) => {
        const target = event.target;
        if (
          !(target instanceof HTMLLIElement) ||
          !props.callback
        ) {
          return;
        }

        event.preventDefault();

        const text = target.innerText ?? '';
        props.callback(text);
      },
      [props]
    );

  console.log('terms');

  const arr =
    props.terms?.map((s) => (
      <li onMouseDown={handleClick}>{s}</li>
    )) ?? [];
  return (
    <>
      <ul ref={ulRef} className={props.className}>
        {...arr}
      </ul>
    </>
  );
};
