import { fireEvent, render, screen } from '@testing-library/react';
import type { Customer } from '@commercetools/platform-sdk';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import UserInformation from './UserInformation';

const user: Customer = {
  id: 'test-id',
  version: 1,
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1995-08-02',
  email: 'test@test.com',
  createdAt: '',
  lastModifiedAt: '',
  addresses: [],
  isEmailVerified: false,
  authenticationMode: 'Password',
};

describe('UserAddresses', () => {
  test('renders correctly (with disabled field)', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserInformation user={user} setUser={jest.fn()} />
      </LocalizationProvider>
    );

    const firstName = screen.getByLabelText('First Name');
    expect(firstName).toBeInTheDocument();
    expect(firstName).toBeDisabled();

    const lastName = screen.getByLabelText('Last Name');
    expect(lastName).toBeInTheDocument();
    expect(lastName).toBeDisabled();

    const email = screen.getByLabelText('Email');
    expect(email).toBeInTheDocument();
    expect(email).toBeDisabled();

    const dateOfBirth = screen.getByLabelText('Date of birth');
    expect(dateOfBirth).toBeInTheDocument();
    expect(dateOfBirth).toBeDisabled();

    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toBeEnabled();
  });

  test('edit mode activated correctly', () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserInformation user={user} setUser={jest.fn()} />
      </LocalizationProvider>
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const firstName = screen.getByLabelText('First Name');
    expect(firstName).toBeInTheDocument();
    expect(firstName).toBeEnabled();

    const lastName = screen.getByLabelText('Last Name');
    expect(lastName).toBeInTheDocument();
    expect(lastName).toBeEnabled();

    const email = screen.getByLabelText('Email');
    expect(email).toBeInTheDocument();
    expect(email).toBeEnabled();

    const dateOfBirth = screen.getByLabelText('Date of birth');
    expect(dateOfBirth).toBeInTheDocument();
    expect(dateOfBirth).toBeEnabled();

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeEnabled();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toBeEnabled();
  });
});
