import { Avatar, Box, Container, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LoginForm from 'components/LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from 'context';

function LoginPage() {
  const authContext = useContext(AuthContext);
  const isAuth = authContext?.isAuth;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  });

  return (
    <Container maxWidth="xs">
      <Box
        my={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textTransform: 'uppercase' }}>
          Account login
        </Typography>
        <LoginForm />
        <Link to="/registration">Don&apos;t have an account? Sign up</Link>
      </Box>
    </Container>
  );
}

export default LoginPage;
