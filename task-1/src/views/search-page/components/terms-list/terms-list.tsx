import React, { Component, createRef } from 'react';

interface TermsListProps {
  className?: string;
  terms?: string[];
  callback?: (text: string) => void;
}

export class TermsList extends Component<TermsListProps> {
  private ulRef: React.RefObject<HTMLUListElement> =
    createRef();

  private handleClick: React.MouseEventHandler<HTMLLIElement> =
    (event) => {
      const target = event.target;
      if (
        !(target instanceof HTMLLIElement) ||
        !this.props.callback
      ) {
        return;
      }

      event.preventDefault();

      const text = target.innerText ?? '';
      this.props.callback(text);
    };

  render(): React.ReactNode {
    const arr =
      this.props.terms?.map((s) => (
        <li onMouseDown={this.handleClick}>{s}</li>
      )) ?? [];
    return (
      <>
        <ul
          ref={this.ulRef}
          className={this.props.className}
        >
          {...arr}
        </ul>
      </>
    );
  }
}
