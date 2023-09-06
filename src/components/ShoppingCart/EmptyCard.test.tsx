import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmptyCard from './EmptyCard';

describe('EmptyCard', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <EmptyCard />
      </MemoryRouter>
    );

    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();

    const catalogButton = screen.getByText(/catalog/i);
    expect(catalogButton).toBeInTheDocument();
  });
});
