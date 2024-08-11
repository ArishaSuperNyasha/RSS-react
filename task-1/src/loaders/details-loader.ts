import { Params } from 'react-router-dom';
import { OneCharData, disneyApi } from '../services';
import { store } from 'src/app/store';

export const detailsLoader = async ({
  params,
}: {
  params: Params<'characterId'>;
}): Promise<OneCharData> => {
  const { characterId } = params;
  const id = characterId
    ? parseInt(characterId)
    : undefined;
  if (!id || isNaN(id)) {
    throw new Response('The page was not found', {
      status: 404,
    });
  }

  const promise = store.dispatch(
    disneyApi.endpoints.getCharById.initiate({
      idEndpoint: id,
    })
  );

  try {
    const response = await promise.unwrap();
    return response;
  } catch (e) {
    throw new Response('The page was not found', {
      status: 404,
    });
  } finally {
    promise.unsubscribe();
  }
};
