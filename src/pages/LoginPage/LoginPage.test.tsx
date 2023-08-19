import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('renders correctly', () => {
    render(<LoginPage />);

    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();

    const form = screen.getByTestId('login-form');
    expect(form).toBeInTheDocument();

    const signupElement = screen.getByText(/sign up/i);
    expect(signupElement).toBeInTheDocument();
  });
});
