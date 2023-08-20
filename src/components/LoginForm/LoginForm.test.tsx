import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test.only('renders correctly', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const emailElement = screen.getByLabelText('Email');
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByLabelText('Password');
    expect(passwordElement).toBeInTheDocument();

    const submitElement = screen.getByRole('button', { name: 'Login' });
    expect(submitElement).toBeInTheDocument();
  });
});
