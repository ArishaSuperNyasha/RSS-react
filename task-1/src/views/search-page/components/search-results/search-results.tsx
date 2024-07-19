import { useMemo } from 'react';
import {
  CharData,
  AllCharsData,
} from '../../../../services';
import { Link } from 'react-router-dom';
import { ItemsSelector } from 'src/features';

interface SearchResultsProps {
  searchResults?: AllCharsData;
  className?: string;
}

interface SectionDescription {
  name: string;
  type: string;
  text: string;
  _id: number;
}

function getDescription(charData: CharData): string[] {
  return (
    [
      ['film: ', charData.films[0]],
      ['series: ', charData.tvShows[0]],
      [
        'Disneyland attractions: ',
        charData.parkAttractions[0],
      ],
    ].find((pair) => !!pair[1]) ?? ['--:', '--']
  );
}

function getSection(
  description: SectionDescription,
  data: CharData
): JSX.Element {
  const { name, type, text, _id } = { ...description };

  const onClick: React.MouseEventHandler<
    HTMLAnchorElement
  > = (event) => {
    if (
      event.target &&
      (event.target as HTMLElement).tagName === 'INPUT'
    ) {
      event.preventDefault();
    }
  };

  return (
    <Link to={`characters/${_id}`} onClick={onClick}>
      <section>
        <ItemsSelector data={data}></ItemsSelector>
        <h3>{name}</h3>
        <div>
          <h4>{type}</h4>
          <p>{text}</p>
        </div>
      </section>
    </Link>
  );
}

export const SearchResults = (
  props: SearchResultsProps
) => {
  const cardsArr = useMemo(() => {
    const data = props.searchResults?.data;
    const cardsArr: JSX.Element[] =
      data?.map((res) => {
        const description = getDescription(res);
        return getSection(
          {
            _id: res._id,
            name: res.name,
            type: description[0],
            text: description[1],
          },
          res
        );
      }) ?? [];
    return cardsArr;
  }, [props]);

  return (
    <div className={props.className}>{...cardsArr}</div>
  );
};
