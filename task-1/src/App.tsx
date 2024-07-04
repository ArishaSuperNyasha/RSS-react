import { Component, ReactNode } from 'react';
import { SearchPage } from './views';
import './App.css';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <SearchPage />
      </>
    );
  }
}

export default App;
