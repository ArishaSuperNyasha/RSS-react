import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'src/app';
import { Pagination } from 'src/features';

describe('Pagination test', () => {
  it('Renders Pagination', () => {
    const { container } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Pagination
            totalPages={2}
            buttonsCount={2}
          ></Pagination>
        </Provider>
      </MemoryRouter>
    );
    const buttons = container.querySelectorAll('a');
    expect(buttons.length).toBe(4);
  }),
    it('Pagination click is working', () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <Pagination
              totalPages={2}
              buttonsCount={2}
            ></Pagination>
          </Provider>
        </MemoryRouter>
      );
      const nextBtn = screen.getByText('⇨');
      nextBtn.click();
      expect(location.pathname).toBe('/');
    });
});
