import React, { Component, createRef } from 'react';

interface SearchInputProps {
  onInput?: React.FormEventHandler<HTMLInputElement>;
}

export class SearchInput extends Component<SearchInputProps> {
  private inputRef: React.RefObject<HTMLInputElement> =
    createRef();

  public getValue(): string {
    return this.inputRef.current?.value ?? '';
  }

  render(): React.ReactNode {
    return (
      <>
        <input
          ref={this.inputRef}
          onInput={this.props.onInput}
          type="text"
          autoFocus={true}
          autoSave="search"
        />
      </>
    );
  }
}
