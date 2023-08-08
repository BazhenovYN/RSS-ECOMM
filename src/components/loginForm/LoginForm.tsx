import { Box, Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import PasswordField from 'components/PasswordField';
import { emailValidationSchema, passwordValidationSchema } from 'utils/inputValidations';

interface IFormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormValues>({ defaultValues: { email: '', password: '' } });

  const onSubmit = (data: IFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <Box>
      <h2>Account login</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Stack spacing={2} width={400} m="auto">
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
      </form>
      <DevTool control={control} />
    </Box>
  );
}

export default LoginForm;
