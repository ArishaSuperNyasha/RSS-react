import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import {
  ResultCard,
  ResultCardProps,
} from '../views/search-page/components/result-card';
import { vi } from 'vitest';
import { CharData } from 'src/services';
import 'react-redux';

vi.mock('react-redux', () => ({
  useSelector: () => ({
    1: {
      name: 'Jack',
    },
  }),
  useDispatch: () => 1,
}));

describe('ResultCard test', () => {
  const props: ResultCardProps = {
    name: 'Cinderella',
    type: 'film: ',
    text: 'Cinderella',
    _id: 1,
    data: {
      _id: 1,
    } as CharData,
  };

  it('Renders card', () => {
    const { container } = render(
      <Router>
        <ResultCard {...props}></ResultCard>
      </Router>
    );
    const anchor = container.querySelector('a');
    expect(anchor).toBeInTheDocument();
  });

  it('Renders card with proper id', () => {
    const { container } = render(
      <Router>
        <ResultCard {...props}></ResultCard>
      </Router>
    );
    const anchor = container.querySelector('a');
    const match = !!anchor?.href.match(
      `characters/${props._id}`
    );
    expect(match).toBe(true);
  });
});
