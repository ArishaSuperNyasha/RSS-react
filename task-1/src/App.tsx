import { SearchPage } from './views';
import './App.css';
import {
  ErrorBoundary,
  ErrorButtonWrapper,
} from './components';

const App = () => {
  return (
    <ErrorBoundary>
      <ErrorButtonWrapper>
        <SearchPage></SearchPage>
      </ErrorButtonWrapper>
    </ErrorBoundary>
  );
};

export default App;
