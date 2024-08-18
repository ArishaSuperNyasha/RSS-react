import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UncontrolledForm, ReactHookForm, Main } from './pages';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="react-hook-form" element={<ReactHookForm />} />
          <Route path="uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
