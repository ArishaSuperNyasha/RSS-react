import {
  CharData,
  AllCharsData,
} from '../../../../services';

interface SearchResultsProps {
  searchResults?: AllCharsData;
  className?: string;
}

interface SectionDescription {
  name: string;
  type: string;
  text: string;
}

export const SearchResults = (
  props: SearchResultsProps
) => {
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
    description: SectionDescription
  ): JSX.Element {
    const { name, type, text } = { ...description };
    return (
      <section>
        <h3>{name}</h3>
        <div>
          <h4>{type}</h4>
          <p>{text}</p>
        </div>
      </section>
    );
  }

  const data = props.searchResults?.data;
  const cardsArr: JSX.Element[] =
    data?.map((res) => {
      const description = getDescription(res);
      return getSection({
        name: res.name,
        type: description[0],
        text: description[1],
      });
    }) ?? [];

  return (
    <div className={props.className}>{...cardsArr}</div>
  );
};
