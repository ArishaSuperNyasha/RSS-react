import React, { Component, createRef } from 'react';

interface SearchInputProps {
  onInput?: React.FormEventHandler<HTMLInputElement>;
}

class SearchInput extends Component<SearchInputProps> {
  private inputRef: React.RefObject<HTMLInputElement> =
    createRef();

  public getValue(): string {
    return this.inputRef.current?.value ?? '';
  }

  public clearField(): void {
    if (this.inputRef.current) {
      this.inputRef.current.value = '';
    }
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

export { SearchInput };
