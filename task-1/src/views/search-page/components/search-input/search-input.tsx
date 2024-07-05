import React, { Component, createRef } from 'react';

interface SearchInputProps {
  onInput?: React.FormEventHandler<HTMLInputElement>;
  onFocus?: React.FormEventHandler<HTMLInputElement>;
  onBlur?: React.FormEventHandler<HTMLInputElement>;
}

export class SearchInput extends Component<SearchInputProps> {
  private inputRef: React.RefObject<HTMLInputElement> =
    createRef();

  public getValue(): string {
    return this.inputRef.current?.value ?? '';
  }

  public inputValue(stroke: string): void {
    const inputElement = this.inputRef.current;
    if (inputElement) {
      inputElement.value = stroke;
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <input
          ref={this.inputRef}
          onInput={this.props.onInput}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          type="text"
          autoFocus={true}
          autoSave="search"
        />
      </>
    );
  }
}
