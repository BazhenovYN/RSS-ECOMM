import { render, screen } from '@testing-library/react';
import ErrorSnackbar from 'components/ErrorSnackbar';

describe('ErrorSnackbar', () => {
  test('renders correctly', () => {
    render(<ErrorSnackbar error="error" onClose={() => {}} />);

    const errorSnackbar = screen.getByRole('alert');
    expect(errorSnackbar).toHaveTextContent('error');
  });

  test("doesn't render without error", () => {
    render(<ErrorSnackbar error={null} onClose={() => {}} />);

    const errorSnackbar = screen.queryByRole('alert');
    expect(errorSnackbar).not.toBeInTheDocument();
  });
});
