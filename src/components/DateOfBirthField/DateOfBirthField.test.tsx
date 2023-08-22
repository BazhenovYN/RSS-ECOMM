import { render, screen } from '@testing-library/react';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormProvider, useForm } from 'react-hook-form';
import DateOfBirthField from './DateOfBirthField';

interface IFormValues {
  dateOfBirth: string;
}

interface IProps {
  label?: string;
}

function MockComponent({ label }: IProps) {
  const methods = useForm<IFormValues>();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormProvider {...methods}>
        <Box component="form">
          <DateOfBirthField label={label} />
        </Box>
      </FormProvider>
    </LocalizationProvider>
  );
}

describe('DateOfBirthField', () => {
  test('renders correctly (with default label)', () => {
    render(<MockComponent />);
    const dateElement = screen.getByLabelText('Date of birth');
    expect(dateElement).toBeInTheDocument();
  });

  test('renders correctly (with custom label)', () => {
    render(<MockComponent label="Start date" />);
    const dateElement = screen.getByLabelText('Start date');
    expect(dateElement).toBeInTheDocument();
  });
});
