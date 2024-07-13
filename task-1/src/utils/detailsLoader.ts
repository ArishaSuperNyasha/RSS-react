import { Params } from 'react-router-dom';
import { Api, OneCharData } from '../services';

export type CharacterLoaderReturnType = {
  character: OneCharData;
} | null;

export const detailsLoader = async ({
  params,
}: {
  params: Params<'characterId'>;
}): Promise<CharacterLoaderReturnType> => {
  const { characterId } = params;
  const id = characterId
    ? parseInt(characterId)
    : undefined;
  if (!id || isNaN(id)) {
    throw new Response('The page was not found', {
      status: 404,
    });
  }
  const character = await Api.getCharById(id);
  return { character };
};
