import { useLoaderData } from 'react-router-dom';
import { CharacterLoaderReturnType } from '../../utils';
import { useCharactersClose } from '../../hooks';

export const CharacterDetails = () => {
  const { closeCharacters } = useCharactersClose();

  const data = useLoaderData() as CharacterLoaderReturnType;
  if (!data) {
    return;
  }
  const character = data.character.data;

  return (
    <div id='character'>
      <div>
        <img
          src={
            character?.imageUrl ||
            `https://robohash.org/${character?._id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <button onClick={() => closeCharacters()}>x</button>
        <h1>
          {character?.name ? (
            <>{character.name}</>
          ) : (
            <i>No Name</i>
          )}{' '}
        </h1>
      </div>
    </div>
  );
};
