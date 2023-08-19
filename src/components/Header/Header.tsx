import { AppBar, Toolbar, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import LinkButton from 'components/LinkButton/LinkButton';
import NavMenu from './NavMenu';
import CartButton from './CartButton';

import './Header.scss';

function Header() {
  const isAuth = false;

  return (
    <AppBar component="header" position="static" color="transparent">
      <Toolbar sx={{ justifyContent: 'space-between', fontWeight: '700' }}>
        <NavMenu />
        <Stack direction="row" spacing={2}>
          <CartButton />
          {!isAuth && <LinkButton title="Sign in" link="/login" icon={<PersonIcon />} />}
          {!isAuth && <LinkButton title="Sign up" link="/registration" icon={<PersonAddIcon />} />}
          {isAuth && <LinkButton title="Sign out" link="/" icon={<LogoutIcon />} />}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
