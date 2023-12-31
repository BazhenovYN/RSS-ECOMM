import { fireEvent, render, screen } from '@testing-library/react';
import AddressCard from 'components/AddressCard';
import { AddressData } from 'types/types';

const address: AddressData = {
  id: '1',
  country: 'GB',
  city: 'London',
  postalCode: '12345',
  street: 'Baker Street',
  isBilling: true,
  isShipping: true,
  isDefaultBilling: true,
  isDefaultShipping: true,
};

const setRedactedAddress = jest.fn();

describe('AddressCard', () => {
  test('render correctly', () => {
    render(
      <AddressCard
        address={address}
        userVersion={1}
        setUser={jest.fn}
        setRedactedAddress={setRedactedAddress}
        handleEdit={jest.fn}
      />
    );

    const country = screen.getByText(/United Kingdom/i);
    expect(country).toBeInTheDocument();

    const street = screen.getByText(/London/i);
    expect(street).toBeInTheDocument();

    const city = screen.getByText(/Baker Street/i);
    expect(city).toBeInTheDocument();

    const postalCode = screen.getByText(/12345/i);
    expect(postalCode).toBeInTheDocument();

    const defaultBillingAddressLabel = screen.getByText(/Default Billing/i);
    expect(defaultBillingAddressLabel).toBeInTheDocument();

    const defaultShippingAddressLabel = screen.getByText(/Default Shipping/i);
    expect(defaultShippingAddressLabel).toBeInTheDocument();

    const editAddressButton = screen.getByText(/edit/i);
    expect(editAddressButton).toBeInTheDocument();

    const deleteAddressButton = screen.getByText(/delete/i);
    expect(deleteAddressButton).toBeInTheDocument();

    fireEvent.click(editAddressButton);
    expect(setRedactedAddress).toBeCalledWith(address);
  });
});
