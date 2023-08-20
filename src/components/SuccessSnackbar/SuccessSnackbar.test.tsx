import { render, screen } from '@testing-library/react';
import SuccessSnackbar from 'components/SuccessSnackbar';

describe('SuccessSnackbar', () => {
  test('renders correctly', () => {
    render(<SuccessSnackbar message="message" onClose={() => {}} />);

    const errorSnackbar = screen.getByRole('alert');
    expect(errorSnackbar).toHaveTextContent('message');
  });

  test("doesn't render without message", () => {
    render(<SuccessSnackbar message={null} onClose={() => {}} />);

    const errorSnackbar = screen.queryByRole('alert');
    expect(errorSnackbar).not.toBeInTheDocument();
  });
});
