import { AUTHORS, YEAR_OF_CREATION } from 'constants/const';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('renders correctly', () => {
    render(<Footer />);

    const authorsElement = screen.getByText(new RegExp(`${AUTHORS}`));
    expect(authorsElement).toBeInTheDocument();

    const yearElement = screen.getByText(new RegExp(`${YEAR_OF_CREATION}`));
    expect(yearElement).toBeInTheDocument();
  });
});
