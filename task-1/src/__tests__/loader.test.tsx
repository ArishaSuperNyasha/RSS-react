import { render, screen } from '@testing-library/react';
import { Loader } from '../features';

describe('Example 1 renders successfully', () => {
  it('renders headline', () => {
    render(<Loader />);
    const headline = screen.getByText('Loading...');
    expect(headline).toBeInTheDocument();
  });
});
