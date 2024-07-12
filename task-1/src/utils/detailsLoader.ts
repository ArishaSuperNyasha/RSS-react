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
  const id = params.characterId;
  if (!id) {
    return null;
  }
  const character = await Api.getCharById(parseInt(id));
  return { character };
};
