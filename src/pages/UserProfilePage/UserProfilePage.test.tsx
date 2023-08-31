import { fireEvent, render, screen } from '@testing-library/react';
import type { Customer } from '@commercetools/platform-sdk';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AddressData } from 'types/types';
import UserProfilePage from './UserProfilePage';

jest.mock('services/sdk/customer', () => ({
  __esModule: true,
  getUserCustomer: () =>
    Promise.resolve<Customer>({
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
    }),
  getAddressesData: (): AddressData[] => [
    {
      id: 'test-id',
      country: 'RU',
      city: 'city',
      postalCode: '110000',
      street: 'street',
      isBilling: true,
      isShipping: false,
      isDefaultBilling: true,
      isDefaultShipping: false,
    },
  ],
}));

describe('UserProfilePage', () => {
  test('renders correctly', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProfilePage />
      </LocalizationProvider>
    );

    const generalTab = await screen.findByLabelText('General');
    expect(generalTab).toBeInTheDocument();

    const passwordTab = await screen.findByLabelText('Password');
    expect(passwordTab).toBeInTheDocument();

    const addressesTab = await screen.findByLabelText('Addresses');
    expect(addressesTab).toBeInTheDocument();

    const form = await screen.findByTestId('change-user-information-form');
    expect(form).toBeInTheDocument();
  });

  test('tab Password opened correctly', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProfilePage />
      </LocalizationProvider>
    );

    const passwordTab = await screen.findByRole('tab', { name: /password/i });
    fireEvent.click(passwordTab);

    const form = await screen.findByTestId('change-user-password-form');
    expect(form).toBeInTheDocument();
  });

  test('tab Addresses opened correctly', async () => {
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserProfilePage />
      </LocalizationProvider>
    );

    const addressesTab = await screen.findByRole('tab', { name: /addresses/i });
    fireEvent.click(addressesTab);

    const addresses = await screen.findByTestId('addresses');
    expect(addresses).toBeInTheDocument();
  });
});
