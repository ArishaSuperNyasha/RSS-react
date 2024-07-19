import { SearchPage } from './views';
import './App.css';
import './page.css';
import {
  ErrorBoundary,
  ErrorButtonWrapper,
  Loader,
  ThemeProvider,
  ThemeButtonWrapper,
} from './components';
import { Outlet, useNavigation } from 'react-router-dom';

const App = () => {
  const navigation = useNavigation();

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ThemeButtonWrapper>
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
        </ThemeButtonWrapper>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
