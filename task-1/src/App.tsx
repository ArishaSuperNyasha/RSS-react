import { Component, ReactNode } from 'react';
import { SearchPage } from './views';
import './App.css';
import {
  ErrorBoundary,
  ErrorButtonWrapper,
} from './components';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <ErrorButtonWrapper>
          <SearchPage></SearchPage>
        </ErrorButtonWrapper>
      </ErrorBoundary>
    );
  }
}

export default App;
