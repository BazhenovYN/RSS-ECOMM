import { render, screen } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter } from 'react-router-dom';
import RegistrationPage from './RegistrationPage';

describe('RegistrationPage', () => {
  test('renders correctly', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <RegistrationPage />
        </BrowserRouter>
      </LocalizationProvider>
    );

    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();

    const form = screen.getByTestId('registration-form');
    expect(form).toBeInTheDocument();

    const signupElement = screen.getByText(/sign in/i);
    expect(signupElement).toBeInTheDocument();
  });
});
