import React from 'react';
import { ChildrenProps } from '../interfaces';
import './style.css';

export class ErrorButtonWrapper extends React.Component<ChildrenProps> {
  state: Readonly<{
    error: boolean;
  }> = {
    error: false,
  };

  static getDerivedStateFromError() {
    return { error: true };
  }

  onClick = () => {
    this.setState({ error: true });
  };

  render() {
    if (this.state.error) {
      throw new Error(
        `It's code generated error, don't worry`
      );
    }
    return (
      <div className='error-button-wrapper'>
        <button onClick={this.onClick}>
          Generate Error
        </button>
        {this.props.children}
      </div>
    );
  }
}
