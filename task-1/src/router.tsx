import { createBrowserRouter } from 'react-router-dom';
import { Page404, CharacterDetails } from './views';
import { detailsLoader, resultsLoader } from './loaders';
import { App } from './app';

export const routerConfig = [
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
];

export const router = createBrowserRouter(routerConfig);
