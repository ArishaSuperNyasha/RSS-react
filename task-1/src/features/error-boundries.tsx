import React from 'react';
import { ChildrenProps } from './interfaces';

export class ErrorBoundary extends React.Component<ChildrenProps> {
  state: Readonly<{
    hasError: boolean;
  }> = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(
    error: unknown,
    info: { componentStack?: string }
  ) {
    console.log(`${error}`);
    console.log(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
