import { SearchPage } from './views';
import './App.css';
import {
  ErrorBoundary,
  ErrorButtonWrapper,
} from './components';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <ErrorBoundary>
      <ErrorButtonWrapper>
        <SearchPage></SearchPage>
        <div id='details'>
          <Outlet />
        </div>
      </ErrorButtonWrapper>
    </ErrorBoundary>
  );
};

export default App;
