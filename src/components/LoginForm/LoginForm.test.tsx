import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('renders correctly', () => {
    render(<LoginForm />);

    const emailElement = screen.getByLabelText('Email');
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByLabelText('Password');
    expect(passwordElement).toBeInTheDocument();

    const submitElement = screen.getByRole('button', { name: 'Login' });
    expect(submitElement).toBeInTheDocument();
  });
});
