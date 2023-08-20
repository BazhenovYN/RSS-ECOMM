import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();

    const form = screen.getByTestId('login-form');
    expect(form).toBeInTheDocument();

    const signupElement = screen.getByText(/sign up/i);
    expect(signupElement).toBeInTheDocument();
  });
});
