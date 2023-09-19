import { fireEvent, render, screen } from '@testing-library/react';
import type { Customer } from '@commercetools/platform-sdk';
import UserPassword from './UserPassword';

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

describe('UserPassword', () => {
  test('renders correctly (with disabled field)', () => {
    render(<UserPassword user={user} setUser={jest.fn()} />);

    const currentPassword = screen.getByLabelText('Current password');
    expect(currentPassword).toBeInTheDocument();
    expect(currentPassword).toBeDisabled();

    const newPassword = screen.getByLabelText('New password');
    expect(newPassword).toBeInTheDocument();
    expect(newPassword).toBeDisabled();

    const confirmNewPassword = screen.getByLabelText('Confirm new password');
    expect(confirmNewPassword).toBeInTheDocument();
    expect(confirmNewPassword).toBeDisabled();

    const editButton = screen.getByRole('button', { name: /edit/i });
    expect(editButton).toBeInTheDocument();
    expect(editButton).toBeEnabled();
  });

  test('edit mode activated correctly', () => {
    render(<UserPassword user={user} setUser={jest.fn()} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const currentPassword = screen.getByLabelText('Current password');
    expect(currentPassword).toBeInTheDocument();
    expect(currentPassword).toBeEnabled();

    const newPassword = screen.getByLabelText('New password');
    expect(newPassword).toBeInTheDocument();
    expect(newPassword).toBeEnabled();

    const confirmNewPassword = screen.getByLabelText('Confirm new password');
    expect(confirmNewPassword).toBeInTheDocument();
    expect(confirmNewPassword).toBeEnabled();

    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toBeEnabled();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toBeEnabled();
  });
});
