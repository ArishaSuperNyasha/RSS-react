import { useMemo } from 'react';
import {
  CharData,
  AllCharsData,
} from '../../../../services';
import { ResultCard } from '..';

export interface SearchResultsProps {
  searchResults?: AllCharsData;
  className?: string;
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

function getResultElements(
  props: SearchResultsProps
): JSX.Element[] {
  const data = props.searchResults?.data;
  const cardsArr: JSX.Element[] =
    data?.map((res) => {
      const description = getDescription(res);
      return ResultCard({
        _id: res._id,
        name: res.name,
        type: description[0],
        text: description[1],
        data: res,
      });
    }) ?? [];
  return cardsArr;
}

export const SearchResults = (
  props: SearchResultsProps
) => {
  const cardsArr = useMemo(
    () => getResultElements(props),
    [props]
  );

  return (
    <div className={props.className}>{...cardsArr}</div>
  );
};
