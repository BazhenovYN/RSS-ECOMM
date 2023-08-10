import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('renders correctly', () => {
    render(<LoginPage />);

    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();

    const emailElement = screen.getByLabelText('Email');
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByLabelText('Password');
    expect(passwordElement).toBeInTheDocument();

    const submitElement = screen.getByRole('button', { name: 'Login' });
    expect(submitElement).toBeInTheDocument();

    const signupElement = screen.getByText(/sign up/i);
    expect(signupElement).toBeInTheDocument();
  });
});
