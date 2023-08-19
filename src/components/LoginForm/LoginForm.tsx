import validationSchemes from 'constants/validationSchemes';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';
import PasswordField from 'components/PasswordField';
import { login } from 'services/sdk/customer';
import { useContext, useState } from 'react';
import AuthContext from 'context';
import FormErrorSnackbar from 'components/FormErrorSnackbar';

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

  const authContext = useContext(AuthContext);
  const setIsAuth = authContext?.setIsAuth;

  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = async (data: IFormValues): Promise<void> => {
    try {
      await login(data.email, data.password);
      if (setIsAuth) {
        setIsAuth(true);
      }
    } catch (error) {
      const errorMessage: string = error instanceof Error ? error.message : 'Unknown error';
      setAuthError(errorMessage);
    }
  };
  return (
    <Box
      data-testid="login-form"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
      sx={{ width: 1 }}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          type="email"
          {...register('email', validationSchemes.email)}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <PasswordField
          {...register('password', validationSchemes.password)}
          isError={!!errors.password}
          errorMessage={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </Stack>
      <FormErrorSnackbar error={authError} onClose={() => setAuthError(null)} />
    </Box>
  );
}

export default LoginForm;
