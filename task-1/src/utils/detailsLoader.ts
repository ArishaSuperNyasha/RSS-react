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
    throw new Error('bleh');
  }
  const character = await Api.getCharById(id);
  return { character };
};
