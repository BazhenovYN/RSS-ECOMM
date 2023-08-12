import { emailValidationSchema, passwordValidationSchema } from 'constants/validationSchemes';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';
import PasswordField from 'components/PasswordField';
import { Customer } from '@commercetools/platform-sdk';
import { login } from '../../services/sdk/customer';

interface IFormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (data: IFormValues): Promise<void> => {
    try {
      const customer: Customer = await login(data.email, data.password);
      // eslint-disable-next-line no-console
      console.log(customer);
    } catch (error) {
      const errorMessage: string = error instanceof Error ? error.message : 'Unknown error';
      // eslint-disable-next-line no-console
      console.log(errorMessage);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" sx={{ width: 1 }}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          {...register('email', emailValidationSchema)}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <PasswordField
          {...register('password', passwordValidationSchema)}
          isError={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Stack>
    </Box>
  );
}

export default LoginForm;
