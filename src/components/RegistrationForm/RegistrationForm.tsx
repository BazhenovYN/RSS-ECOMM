import validationSchemes from 'constants/validationSchemes';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import PasswordField from 'components/PasswordField';
import AddressFields from 'components/AddressFields';
import DateOfBirthField from 'components/DateOfBirthField';
import { type ChangeEvent, useState, useContext } from 'react';
import { createCustomer, login } from 'services/sdk/customer';
import { RegistrationFormData } from 'types/types';
import { useNavigate } from 'react-router-dom';
import AppContext from 'context';
import { removeAuthTokens } from 'services/sdk/client';

const defaultValues: Partial<RegistrationFormData> = {
  email: '',
  password: '',
  firstName: '',
  dateOfBirth: '',
  shippingAddress: {
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false,
  },
  billingAddress: {
    street: '',
    city: '',
    postalCode: '',
    country: '',
    isDefault: false,
  },
};

function RegistrationForm() {
  const methods = useForm<RegistrationFormData>({ defaultValues, mode: 'all' });
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const appContext = useContext(AppContext);
  const setIsAuth = appContext?.setIsAuth;
  const setMessage = appContext?.setMessage;
  const setUser = appContext?.setUser;
  const cart = appContext?.cart;

  const [disabledAddress, setDisabledAddress] = useState(false);

  const navigate = useNavigate();

  const copyAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setDisabledAddress(event.target.checked);
    if (!event.target.checked) return;
    const shippingAddress = getValues('shippingAddress');
    setValue('billingAddress', shippingAddress, { shouldDirty: true, shouldTouch: true });
  };

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await createCustomer(data, cart?.anonymousId);
      removeAuthTokens();
      if (setUser) setUser(await login(data.email, data.password));
      if (setIsAuth) setIsAuth(true);
      navigate('/');
      if (setMessage) setMessage({ severity: 'success', text: 'The account was successfully created' });
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
  return (
    <FormProvider {...methods}>
      <Box
        data-testid="registration-form"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
        sx={{ width: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              {...register('firstName', validationSchemes.firstName)}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              {...register('lastName', validationSchemes.lastName)}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <DateOfBirthField />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="text"
              fullWidth
              {...register('email', validationSchemes.email)}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              {...register('password', validationSchemes.password)}
              isError={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </Grid>
          <AddressFields label="Shipping address" addressType="shippingAddress" />
          <AddressFields label="Billing address" addressType="billingAddress" disabled={disabledAddress} />
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" onChange={copyAddress} />}
              label="Billing address matches shipping address"
            />
          </Grid>
        </Grid>
        <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Sign up
        </Button>
      </Box>
    </FormProvider>
  );
}

export default RegistrationForm;
