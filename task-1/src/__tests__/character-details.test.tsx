import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { CharacterDetails } from 'src/views';
import 'src/hooks';

const mockData = {
  data: {
    allies: [],
    createdAt: '01.01.2001',
    enemies: [],
    films: [],
    imageUrl: 'sdbsbsbsdhsac.jpg',
    name: 'Qua Qua',
    parkAttractions: [],
    shortFilms: [],
    sourceUrl: '',
    tvShows: [
      'Qua Qua The Duck',
      'Qua Qua The Duck Common!',
    ],
    updatedAt: '',
    url: 'savbtrtmr',
    videoGames: [],
    _id: 100,
  },
};

vi.mock('react-router-dom', async (importOriginal) => {
  await importOriginal();
  return {
    useLoaderData: () => mockData,
  };
});

vi.mock('src/hooks', () => ({
  useCharactersClose: () => 1,
}));

describe('CharacterDetails page test', () => {
  it('Renders CharacterDetails', () => {
    const { container } = render(
      <CharacterDetails></CharacterDetails>
    );
    expect(container).toBeInTheDocument();
  });

  it('There is proper inner content', () => {
    const { container } = render(
      <CharacterDetails></CharacterDetails>
    );
    const categoryName = container.querySelector('h3');
    const li1 = screen.getByText(mockData.data.tvShows[0]);
    const li2 = screen.getByText(mockData.data.tvShows[1]);
    expect(categoryName?.textContent).toBe('series: ');
    expect(li1).toBeInTheDocument();
    expect(li2).toBeInTheDocument();
  });
});
