/* eslint-disable @typescript-eslint/no-explicit-any */
import { countries } from 'constants/countries';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React from 'react';

interface IProps {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  onChange: any;
}

const CountrySelect = React.forwardRef(function CountrySelect(
  { label = 'Country', isError, errorMessage, disabled, value, onChange, ...rest }: IProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  return (
    <Autocomplete
      fullWidth
      options={countries}
      autoHighlight
      disabled={disabled}
      getOptionLabel={(option) => option.code}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option.label} ({option.code})
        </Box>
      )}
      ref={ref}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'country',
          }}
          error={!params.inputProps.value && isError}
          helperText={!params.inputProps.value && errorMessage}
          {...rest}
        />
      )}
      onChange={(event, newValue) => onChange({ ...event, target: { ...event, value: newValue?.code } })}
      value={countries.find(({ code }) => code === value)}
    />
  );
});

export default CountrySelect;
