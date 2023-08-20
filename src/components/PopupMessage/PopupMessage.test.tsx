import { render, screen } from '@testing-library/react';
import PopupMessage from 'components/PopupMessage';

describe('PopupMessage', () => {
  test('renders correctly', () => {
    render(<PopupMessage text="error" severity="success" onClose={() => {}} />);

    const errorSnackbar = screen.getByRole('alert');
    expect(errorSnackbar).toHaveTextContent('error');
  });

  test("doesn't render without text", () => {
    render(<PopupMessage text={null} severity="success" onClose={() => {}} />);

    const errorSnackbar = screen.queryByRole('alert');
    expect(errorSnackbar).not.toBeInTheDocument();
  });
});
