import countries from 'constants/countries';
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
  onChange: (value: string) => void;
}

const CountrySelect = React.forwardRef(function CountrySelect(
  { label = 'Country', isError, errorMessage, disabled, value, onChange, ...rest }: IProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Autocomplete
      fullWidth
      options={countries}
      autoHighlight
      disabled={disabled}
      getOptionLabel={(option) => option.label}
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
      inputValue={inputValue}
      onInputChange={(_, newValue) => setInputValue(newValue)}
      onChange={(_, newValue) => {
        onChange(newValue?.code || '');
      }}
      value={countries.find(({ code }) => code === value) || null}
    />
  );
});

export default CountrySelect;
