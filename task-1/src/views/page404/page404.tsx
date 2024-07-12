import {
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';

export const Page404 = () => {
  const error = useRouteError();

  let message;
  if (isRouteErrorResponse(error)) {
    message = error.statusText || error.status;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = 'Unknown Error';
  }

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
};
