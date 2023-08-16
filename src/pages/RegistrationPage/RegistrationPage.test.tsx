import { render, screen } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RegistrationPage from './RegistrationPage';

describe('RegistrationPage', () => {
  test('renders correctly', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RegistrationPage />
      </LocalizationProvider>
    );

    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();

    const firstName = screen.getByLabelText('First Name');
    expect(firstName).toBeInTheDocument();

    const lastName = screen.getByLabelText('Last Name');
    expect(lastName).toBeInTheDocument();

    const emailElement = screen.getByLabelText('Email');
    expect(emailElement).toBeInTheDocument();

    const passwordElement = screen.getByLabelText('Password');
    expect(passwordElement).toBeInTheDocument();

    const dateElement = screen.getByLabelText('Date of birth');
    expect(dateElement).toBeInTheDocument();

    const submitElement = screen.getByRole('button', { name: 'Sign up' });
    expect(submitElement).toBeInTheDocument();

    const signupElement = screen.getByText(/login/i);
    expect(signupElement).toBeInTheDocument();
  });
});
