import validationSchemes from 'constants/validationSchemes';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';
import PasswordField from 'components/PasswordField';
import { login } from 'services/sdk/customer';
import { useContext } from 'react';
import AuthContext from 'context';
import { useNavigate } from 'react-router-dom';

interface IFormValues {
  email: string;
  password: string;
}

const defaultValues: IFormValues = { email: '', password: '' };

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({ defaultValues, mode: 'all' });

  const authContext = useContext(AuthContext);
  const setIsAuth = authContext?.setIsAuth;
  const setMessage = authContext?.setMessage;

  const navigate = useNavigate();

  const onSubmit = async (data: IFormValues): Promise<void> => {
    try {
      await login(data.email, data.password);
      if (setIsAuth) {
        setIsAuth(true);
      }
      navigate('/');
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
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
    </Box>
  );
}

export default LoginForm;
