import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material';

function Logo() {
  return (
    <Typography variant="h5" component={RouterLink} to="/" sx={{ textDecoration: 'none' }}>
      Fresh Food
    </Typography>
  );
}

export default Logo;
