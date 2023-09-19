import { render, screen } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

describe('RegistrationForm', () => {
  test('renders correctly', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <RegistrationForm />
        </BrowserRouter>
      </LocalizationProvider>
    );

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

    const submitElement = screen.getByRole('button', { name: /sign up/i });
    expect(submitElement).toBeInTheDocument();
  });
});
