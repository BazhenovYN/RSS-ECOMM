import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );

    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();

    const notFoundElement = screen.getByText('404');
    expect(notFoundElement).toBeInTheDocument();

    const homeElement = screen.getByText(/back home/i);
    expect(homeElement).toBeInTheDocument();
  });
});
