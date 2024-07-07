import React, { Component } from 'react';
import { AllCharsData } from '../../../../services';

interface SearchResultsProps {
  searchResults?: AllCharsData;
  className?: string;
}

export class SearchResults extends Component<SearchResultsProps> {
  render(): React.ReactNode {
    const arr =
      this.props.searchResults?.data.map((res) => {
        const description = [
          ['film: ', res.films[0]],
          ['series: ', res.tvShows[0]],
          [
            'Disneyland attractions: ',
            res.parkAttractions[0],
          ],
        ].find((pair) => !!pair[1]) ?? ['--:', '--'];

        return (
          <section>
            <h3>{res.name}</h3>
            <div>
              <h4>{description[0]}</h4>
              <p>{description[1]}</p>
            </div>
          </section>
        );
      }) ?? [];

    return (
      <div className={this.props.className}>{...arr}</div>
    );
  }
}
