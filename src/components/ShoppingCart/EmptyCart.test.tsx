import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmptyCart from './EmptyCart';

describe('EmptyCart', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>
    );

    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();

    const catalogButton = screen.getByText(/catalog/i);
    expect(catalogButton).toBeInTheDocument();
  });
});
