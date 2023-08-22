import { Box, Stack, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Box px={3}>
      <Typography component="h2" variant="h2" mb={2}>
        Home
      </Typography>
      <Stack spacing={1}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <PersonIcon />
          <Link to="/login">Already have an account? Sign in</Link>
        </Box>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          <PersonAddIcon />
          <Link to="/registration">Don&apos;t have an account? Sign up</Link>
        </Box>
      </Stack>
    </Box>
  );
}

export default HomePage;
