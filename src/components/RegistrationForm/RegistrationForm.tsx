import validationSchemes from 'constants/validationSchemes';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import PasswordField from 'components/PasswordField';
import AddressFields from 'components/AddressFields';
import DateOfBirthField from 'components/DateOfBirthField';
import { type ChangeEvent, useState } from 'react';
import { createCustomer } from 'services/sdk/customer';
import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { RegistrationFormData } from 'types/types';
import FormErrorSnackbar from 'components/FormErrorSnackbar';

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

// eslint-disable-next-line max-lines-per-function
function RegistrationForm() {
  const methods = useForm<RegistrationFormData>({ defaultValues });
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [disabledAddress, setDisabledAddress] = useState(false);

  const [authError, setAuthError] = useState<string | null>(null);

  const copyAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setDisabledAddress(event.target.checked);
    if (!event.target.checked) {
      return;
    }
    const shippingAddress = getValues('shippingAddress');
    setValue('billingAddress', shippingAddress, { shouldDirty: true, shouldTouch: true });
  };

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const customerSignInResult: CustomerSignInResult = await createCustomer(data);
      // eslint-disable-next-line no-console
      console.log(customerSignInResult);
    } catch (error) {
      const errorMessage: string = error instanceof Error ? error.message : 'Unknown error';
      setAuthError(errorMessage);
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
              type="email"
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
      <FormErrorSnackbar error={authError} onClose={() => setAuthError(null)} />
    </FormProvider>
  );
}

export default RegistrationForm;
