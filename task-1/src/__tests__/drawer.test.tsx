import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import 'react-redux';

import { Drawer } from 'src/features';
import 'src/slices';
import 'src/features/drawer/createObjectUrl';

interface StoreMockType {
  [key: number]: object;
}

let storeMock: StoreMockType = {
  1: {
    name: 'Jack',
  },
  2: {
    name: 'Black',
  },
  3: {
    name: 'Flack',
  },
};

vi.mock('src/slices', () => ({
  removeAll: () => {
    storeMock = {};
  },
}));

vi.mock('react-redux', () => ({
  useSelector: () => storeMock,
  useDispatch: () => (some: unknown) => some,
}));

vi.mock('src/features/drawer/createObjectUrl', () => ({
  createObjectURL: () => 'link-on-load',
}));

describe('CharacterDetails page test', () => {
  it('Renders CharacterDetails', () => {
    const { container } = render(<Drawer></Drawer>);
    expect(container).toBeInTheDocument();
  }),
    it('Drawer is opened when there is some data in store', () => {
      const { container } = render(<Drawer></Drawer>);
      const drawer = container.querySelector('.drawer');
      expect(drawer?.classList.contains('opened')).toBe(
        true
      );
    }),
    it('Drawer is closed when we pushed hide button', () => {
      const { container } = render(<Drawer></Drawer>);
      const drawer = container.querySelector('.drawer');
      const hideButton = container.querySelector(
        '.drawer > button'
      ) as HTMLButtonElement;
      hideButton.click();
      expect(drawer?.classList.contains('forced')).toBe(
        true
      );

      hideButton.click();
      expect(drawer?.classList.contains('forced')).toBe(
        false
      );
    }),
    it('Unselect All button is working', () => {
      render(<Drawer></Drawer>);
      const unselectButton =
        screen.getByText('Unselect all');
      unselectButton.click();
      expect(Object.keys(storeMock).length).toBe(0);
    });
});
