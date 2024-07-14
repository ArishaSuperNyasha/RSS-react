import { useLoaderData } from 'react-router-dom';
import { CharacterLoaderReturnType } from '../../utils';
import { useCharactersClose } from '../../hooks';
import './style.css';

function createLis(
  arr: string[],
  categoryName: string
): JSX.Element | null {
  const lis =
    arr.length > 0 ? arr.map((i) => <li>{i}</li>) : null;
  if (!lis) {
    return null;
  }

  return (
    <>
      <h3>{categoryName}</h3>
      <ul>{...lis}</ul>
    </>
  );
}

export const CharacterDetails = () => {
  const { closeCharacters } = useCharactersClose();

  const data = useLoaderData() as CharacterLoaderReturnType;
  if (!data) {
    return;
  }
  const character = data.character.data;

  const films = createLis(character.films, 'films: ');
  const series = createLis(character.tvShows, 'series: ');
  const games = createLis(character.videoGames, 'games: ');
  const shortFilms = createLis(
    character.shortFilms,
    'short films: '
  );
  const parkAttractions = createLis(
    character.parkAttractions,
    'park attractions: '
  );

  return (
    <div className='character'>
      <div>
        <button onClick={() => closeCharacters()}>x</button>

        <div className='image'>
          <img
            src={
              character?.imageUrl ||
              `https://robohash.org/${character?._id}.png?size=200x200`
            }
          />
        </div>

        <div>
          <h2>
            {character?.name ? (
              <>{character.name}</>
            ) : (
              <i>No Name</i>
            )}{' '}
          </h2>

          <div className='info'>
            {[
              films,
              series,
              games,
              shortFilms,
              parkAttractions,
            ]
              .filter((i) => i !== null)
              .map((i, ind) => (
                <div key={ind}>{i}</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
