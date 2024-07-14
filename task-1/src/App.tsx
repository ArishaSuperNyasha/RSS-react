import { SearchPage } from './views';
import './App.css';
import './page.css';
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
        <div className='page'>
          <SearchPage></SearchPage>
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
