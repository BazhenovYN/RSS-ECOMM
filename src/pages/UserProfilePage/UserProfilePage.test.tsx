import { DEFAULT_LANGUAGE } from 'constants/const';
import { fireEvent, render, screen } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AddressData } from 'types/types';
import AppContext, { IAppContext } from 'context';
import UserProfilePage from './UserProfilePage';

jest.mock('services/sdk/customer', () => ({
  __esModule: true,
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

const context: IAppContext = {
  cart: undefined,
  setCart: jest.fn,
  isAuth: false,
  setIsAuth: jest.fn,
  message: { text: null, severity: 'error' },
  setMessage: jest.fn,
  language: DEFAULT_LANGUAGE,
  user: {
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
  },
  setUser: jest.fn,
};

describe('UserProfilePage', () => {
  test('renders correctly', async () => {
    render(
      <AppContext.Provider value={context}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserProfilePage />
        </LocalizationProvider>
      </AppContext.Provider>
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
      <AppContext.Provider value={context}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserProfilePage />
        </LocalizationProvider>
      </AppContext.Provider>
    );

    const passwordTab = await screen.findByRole('tab', { name: /password/i });
    fireEvent.click(passwordTab);

    const form = await screen.findByTestId('change-user-password-form');
    expect(form).toBeInTheDocument();
  });

  test('tab Addresses opened correctly', async () => {
    render(
      <AppContext.Provider value={context}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserProfilePage />
        </LocalizationProvider>
      </AppContext.Provider>
    );

    const addressesTab = await screen.findByRole('tab', { name: /addresses/i });
    fireEvent.click(addressesTab);

    const addresses = await screen.findByTestId('addresses');
    expect(addresses).toBeInTheDocument();
  });
});
