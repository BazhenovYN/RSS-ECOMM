import { Avatar, Box, Container, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LoginForm from 'components/LoginForm';

function LoginPage() {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
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
        <Typography variant="body2">Don&apos;t have an account? Sign Up!</Typography>
      </Box>
    </Container>
  );
}

export default LoginPage;
