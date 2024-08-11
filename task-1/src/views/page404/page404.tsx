import {
  useRouteError,
  isRouteErrorResponse,
} from 'react-router-dom';

export const Page404 = () => {
  const error = useRouteError();

  let message: string;
  let status: string | number | undefined;
  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.data;
  } else if (error instanceof Error) {
    status = error.name;
    message = error.message;
  } else {
    message = 'Unknown Error';
  }

  return (
    <div id='error-page'>
      <h1>{status ?? 'Oops!'}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{message}</i>
      </p>
    </div>
  );
};
