import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import CountrySelect from './CountrySelect';

interface IProps {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

function MockComponent({ label, disabled, isError, errorMessage }: IProps) {
  return (
    <Box component="form">
      <CountrySelect
        label={label}
        disabled={disabled}
        isError={isError}
        errorMessage={errorMessage}
        onChange={() => true}
      />
    </Box>
  );
}

describe('CountrySelect', () => {
  test('renders correctly (with default label)', () => {
    render(<MockComponent />);
    const countryElement = screen.getByLabelText('Country');
    expect(countryElement).toBeInTheDocument();
  });

  test('renders correctly (with custom label)', () => {
    render(<MockComponent label="State" />);
    const countryElement = screen.getByLabelText('State');
    expect(countryElement).toBeInTheDocument();
  });

  test('renders correctly and disabled', () => {
    render(<MockComponent disabled />);
    const countryElement = screen.getByLabelText('Country');
    expect(countryElement).toBeInTheDocument();
    expect(countryElement).toBeDisabled();
  });

  test('show error message', () => {
    const text = 'Houston, we have a problem!';
    render(<MockComponent isError errorMessage={text} />);
    const errorMessage = screen.getByText(text);
    expect(errorMessage).toBeInTheDocument();
  });
});
