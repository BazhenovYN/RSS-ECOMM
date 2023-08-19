import { Avatar, Box, Container, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import RegistrationForm from 'components/RegistrationForm';

function RegistrationPage() {
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
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textTransform: 'uppercase' }}>
          Create account
        </Typography>
        <RegistrationForm />
        <Typography variant="body2">Already have an account? Login now</Typography>
      </Box>
    </Container>
  );
}

export default RegistrationPage;
