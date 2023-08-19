import validationSchemes from 'constants/validationSchemes';
import { DatePicker, DateValidationError } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  label?: string;
}

const MIN_USER_AGE = 13;
const minDate = dayjs('1900-01-01T00:00:00.000');
const maxDate = dayjs().subtract(MIN_USER_AGE, 'year');

function DateOfBirthField({ label = 'Date of birth' }: IProps) {
  const { control } = useFormContext();
  const [error, setError] = useState<DateValidationError | null>(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case 'maxDate': {
        return 'Your age must be over 13 years old';
      }
      case 'minDate':
      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  return (
    <Controller
      control={control}
      name="dateOfBirth"
      rules={validationSchemes.dateOfBirth}
      render={({ field, fieldState }) => (
        <DatePicker
          sx={{ width: 1 }}
          label={label}
          inputRef={field.ref}
          minDate={minDate}
          maxDate={maxDate}
          onChange={field.onChange}
          onError={(newError) => setError(newError)}
          slotProps={{
            textField: {
              helperText: fieldState.error?.message || errorMessage,
              error: !!(fieldState.error || errorMessage),
            },
          }}
        />
      )}
    />
  );
}

export default DateOfBirthField;
