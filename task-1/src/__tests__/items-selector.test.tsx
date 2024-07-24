import { render } from '@testing-library/react';
import { ItemsSelector } from '../features/items-selector';
import 'react-redux';
import { vi } from 'vitest';

vi.mock('react-redux', () => ({
  useSelector: () => ({
    1: {
      name: 'Jack',
    },
  }),
  useDispatch: () => 1,
}));

describe('ItemsSelector test', () => {
  test('Renders checkbox', () => {
    const { container } = render(
      <ItemsSelector data={{ _id: 1 }}></ItemsSelector>
    );
    expect(container).toBeInTheDocument();
  });

  it('Checkbox is checked when id match', () => {
    const { container } = render(
      <ItemsSelector data={{ _id: 1 }}></ItemsSelector>
    );
    const input = container.querySelector('input');
    expect(input?.checked).toBe(true);
  });
});
