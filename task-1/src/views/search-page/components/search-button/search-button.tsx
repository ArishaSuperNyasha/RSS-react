import React, { Component } from 'react';

interface SearchButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

class SearchButton extends Component<SearchButtonProps> {
  render(): React.ReactNode {
    return (
      <>
        <button onClick={this.props.onClick}>Search</button>
      </>
    );
  }
}

export { SearchButton };
