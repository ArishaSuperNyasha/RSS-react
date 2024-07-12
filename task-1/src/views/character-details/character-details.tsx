import { useLoaderData } from 'react-router-dom';
import { CharacterLoaderReturnType } from '../../utils';

export const CharacterDetails = () => {
  const data = useLoaderData() as CharacterLoaderReturnType;
  if (!data) {
    return;
  }
  const character = data.character.data;
  console.log(character);

  return (
    <div id='contact'>
      <div>
        <img
          src={
            character?.imageUrl ||
            `https://robohash.org/${character?._id}.png?size=200x200`
          }
        />
      </div>

      <div>
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
