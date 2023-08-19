import { render, screen } from '@testing-library/react';
import FormErrorSnackbar from 'components/FormErrorSnackbar/index';

describe('FormErrorSnackbar', () => {
  test('renders correctly', () => {
    render(<FormErrorSnackbar error="error" onClose={() => {}} />);

    const errorSnackbar = screen.getByRole('alert');
    expect(errorSnackbar).toHaveTextContent('error');
  });

  test("doesn't render without error", () => {
    render(<FormErrorSnackbar error={null} onClose={() => {}} />);

    const errorSnackbar = screen.queryByRole('alert');
    expect(errorSnackbar).not.toBeInTheDocument();
  });
});
