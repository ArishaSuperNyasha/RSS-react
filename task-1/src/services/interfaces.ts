export type AllCharsData = {
  data: {
    allies: string[];
    createdAt: string;
    enemies: string[];
    films: string[];
    imageUrl: string;
    name: string;
    parkAttractions: string[];
    shortFilms: string[];
    sourceUrl: string;
    tvShows: string[];
    updatedAt: string;
    url: string;
    videoGames: string[];
    _id: number;
  }[];
  info: {
    count: number;
    nextPage: string | null;
    previousPage: string | null;
    totalPages: number;
  };
};
