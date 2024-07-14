import { SearchPage } from './views';
import './App.css';
import {
  ErrorBoundary,
  ErrorButtonWrapper,
  Loader,
} from './components';
import { Outlet, useNavigation } from 'react-router-dom';

const App = () => {
  const navigation = useNavigation();

  return (
    <ErrorBoundary>
      <ErrorButtonWrapper>
        <SearchPage></SearchPage>
        <div id='details'>
          {navigation.state === 'loading' &&
          navigation.location.pathname.includes(
            'characters'
          ) ? (
            <Loader />
          ) : (
            <Outlet />
          )}
        </div>
      </ErrorButtonWrapper>
    </ErrorBoundary>
  );
};

export default App;
