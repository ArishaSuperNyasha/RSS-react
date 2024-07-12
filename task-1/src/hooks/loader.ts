import { Params } from 'react-router-dom';
import { Api, OneCharData } from '../services';

export type LoaderReturnType = {
  character: OneCharData;
} | null;

export const loader = async ({
  params,
}: {
  params: Params<'characterId'>;
}): Promise<LoaderReturnType> => {
  const id = params.characterId;
  if (!id) {
    return null;
  }
  const character = await Api.getCharById(parseInt(id));
  return { character };
};
