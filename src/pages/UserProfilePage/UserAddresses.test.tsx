import UserAddresses from 'pages/UserProfilePage/UserAddresses';
import { fireEvent, render, screen } from '@testing-library/react';
import { Customer } from '@commercetools/platform-sdk';

const user: Customer = {
  id: 'test-id',
  version: 1,
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1995-08-02',
  email: 'test@test.com',
  createdAt: '',
  lastModifiedAt: '',
  addresses: [
    {
      country: 'GB',
      id: '1',
    },
  ],
  isEmailVerified: false,
  authenticationMode: 'Password',
};

describe('UserAddresses', () => {
  test('render correctly', async () => {
    render(<UserAddresses user={user} setUser={jest.fn} />);

    const country = screen.getByText(/United Kingdom/i);
    expect(country).toBeInTheDocument();

    const addAddressButton = screen.getByText(/add address/i);
    expect(addAddressButton).toBeInTheDocument();
    fireEvent.click(addAddressButton);

    const addressForm = await screen.findByTestId('address-form');
    expect(addressForm).toBeInTheDocument();
  });
});
