import React, { Component, createRef } from 'react';

interface SearchButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export class SearchButton extends Component<SearchButtonProps> {
  private buttonRef: React.RefObject<HTMLButtonElement> =
    createRef();

  render(): React.ReactNode {
    return (
      <>
        <button
          ref={this.buttonRef}
          onClick={this.props.onClick}
        >
          Search
        </button>
      </>
    );
  }
}
