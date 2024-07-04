import React, { Component } from 'react';

interface TermsListProps {
  terms?: string[];
}

export class TermsList extends Component<TermsListProps> {
  render(): React.ReactNode {
    const arr =
      this.props.terms?.map((s) => <li>{s}</li>) ?? [];
    return (
      <>
        <ul>{...arr}</ul>
      </>
    );
  }
}
