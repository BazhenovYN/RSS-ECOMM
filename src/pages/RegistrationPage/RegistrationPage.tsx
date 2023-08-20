import { Avatar, Box, Container, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import RegistrationForm from 'components/RegistrationForm';
import { Link } from 'react-router-dom';

function RegistrationPage() {
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
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textTransform: 'uppercase' }}>
          Create account
        </Typography>
        <RegistrationForm />
        <Link to="/login">Already have an account? Sign in</Link>
      </Box>
    </Container>
  );
}

export default RegistrationPage;
