import React, { Component } from 'react';

interface TermsListProps {
  className?: string;
  terms?: string[];
  callback?: (text: string) => void;
}

export class TermsList extends Component<TermsListProps> {
  private handleClick: React.MouseEventHandler<HTMLLIElement> =
    (event) => {
      const target = event.target;
      if (
        !(target instanceof HTMLLIElement) ||
        !this.props.callback
      ) {
        return;
      }

      const text = target.innerText ?? '';
      this.props.callback(text);
    };

  render(): React.ReactNode {
    const arr =
      this.props.terms?.map((s) => (
        <li onClick={this.handleClick}>{s}</li>
      )) ?? [];
    return (
      <>
        <ul className={this.props.className}>{...arr}</ul>
      </>
    );
  }
}
