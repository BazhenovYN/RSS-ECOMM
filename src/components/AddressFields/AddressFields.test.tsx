import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import AddressFields from './AddressFields';

interface IAddresses {
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  };
  billingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  };
}

interface IProps {
  label: string;
  addressType: 'shippingAddress' | 'billingAddress';
  disabled?: boolean;
}

function MockComponent({ label, addressType, disabled }: IProps) {
  const methods = useForm<IAddresses>();
  return (
    <FormProvider {...methods}>
      <Box component="form">
        <AddressFields label={label} addressType={addressType} disabled={disabled} />
      </Box>
    </FormProvider>
  );
}

describe('AddressFields', () => {
  test('renders correctly and enabled', () => {
    render(<MockComponent label="Shipping address" addressType="shippingAddress" />);

    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();

    const countryElement = screen.getByLabelText('Country');
    expect(countryElement).toBeInTheDocument();
    expect(countryElement).toBeEnabled();

    const postalCodeElement = screen.getByLabelText('Postal code');
    expect(postalCodeElement).toBeInTheDocument();
    expect(postalCodeElement).toBeEnabled();

    const cityElement = screen.getByLabelText('City');
    expect(cityElement).toBeInTheDocument();
    expect(cityElement).toBeEnabled();

    const streetElement = screen.getByLabelText('Street');
    expect(streetElement).toBeInTheDocument();
    expect(streetElement).toBeEnabled();
  });

  test('renders correctly and disabled', () => {
    render(<MockComponent label="Shipping address" addressType="shippingAddress" disabled />);

    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();

    const countryElement = screen.getByLabelText('Country');
    expect(countryElement).toBeInTheDocument();
    expect(countryElement).toBeDisabled();

    const postalCodeElement = screen.getByLabelText('Postal code');
    expect(postalCodeElement).toBeInTheDocument();
    expect(postalCodeElement).toBeDisabled();

    const cityElement = screen.getByLabelText('City');
    expect(cityElement).toBeInTheDocument();
    expect(cityElement).toBeDisabled();

    const streetElement = screen.getByLabelText('Street');
    expect(streetElement).toBeInTheDocument();
    expect(streetElement).toBeDisabled();
  });
});
