import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('renders correctly', () => {
    render(<NotFoundPage />);

    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();

    const notFoundElement = screen.getByText('404');
    expect(notFoundElement).toBeInTheDocument();

    const homeElement = screen.getByRole('button', { name: /home/i });
    expect(homeElement).toBeInTheDocument();
  });
});
