import React, { Component } from 'react';
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

export class SearchResults extends Component<SearchResultsProps> {
  private getDescription(charData: CharData): string[] {
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

  private getSection(
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

  render(): React.ReactNode {
    const data = this.props.searchResults?.data;
    let arr: JSX.Element[];
    if (Array.isArray(data)) {
      arr =
        data?.map((res) => {
          const description = this.getDescription(res);
          return this.getSection({
            name: res.name,
            type: description[0],
            text: description[1],
          });
        }) ?? [];
    } else if (data) {
      const description = this.getDescription(data);
      arr = [
        this.getSection({
          name: data.name,
          type: description[0],
          text: description[1],
        }),
      ];
    } else {
      arr = [];
    }

    return (
      <div className={this.props.className}>{...arr}</div>
    );
  }
}
