import { useForm } from 'react-hook-form';
import { Box, Button, Grid, TextField } from '@mui/material';
import PasswordField from 'components/PasswordField';
import { emailValidationSchema, passwordValidationSchema } from 'utils/inputValidations';

interface IFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

const defaultValues = {
  email: '',
  password: '',
};

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ defaultValues });

  const onSubmit = (data: IFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" sx={{ width: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField name="firstName" fullWidth id="firstName" label="First Name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="lastName" fullWidth id="lastName" label="Last Name" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register('email', emailValidationSchema)}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            {...register('password', passwordValidationSchema)}
            isError={!!errors.password}
            errorMessage={errors.password?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="country" fullWidth id="country" label="Country" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="postalCode" fullWidth id="postalCode" label="Postal code" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="city" fullWidth id="city" label="City" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="street" fullWidth id="street" label="Street" />
        </Grid>
      </Grid>
      <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
}

export default RegistrationForm;
