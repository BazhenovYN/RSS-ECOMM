import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import logo from 'assets/img/logo.png';

function Logo() {
  return (
    <Link to="/">
      <Box component="img" src={logo} width={40} display={{ xs: 'none', md: 'flex' }} mr={2} />
    </Link>
  );
}

export default Logo;
