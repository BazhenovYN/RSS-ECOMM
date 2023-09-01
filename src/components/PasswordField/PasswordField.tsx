import React, { useState } from 'react';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface IProps {
  id?: string;
  label?: string;
  disabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const PasswordField = React.forwardRef(function PasswordField(
  { id = 'password', label = 'Password', disabled, isError, errorMessage, ...rest }: IProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl disabled={disabled} fullWidth variant="outlined" error={isError}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        ref={ref}
        {...rest}
      />
      <FormHelperText id="component-error-text">{errorMessage}</FormHelperText>
    </FormControl>
  );
});

export default PasswordField;
