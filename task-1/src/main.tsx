import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import { Page404, CharacterDetails } from './views';
import { detailsLoader, resultsLoader } from './utils';

const router = createBrowserRouter([
  {
    path: '/:pageNumber?',
    element: <App />,
    errorElement: <Page404 />,
    loader: resultsLoader,
    children: [
      {
        path: 'characters/:characterId',
        element: <CharacterDetails />,
        loader: detailsLoader,
        errorElement: <Page404 />,
      },
    ],
  },
]);

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
