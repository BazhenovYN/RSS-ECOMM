import { useContext } from 'react';
import { AppBar, Toolbar, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LinkButton from 'components/LinkButton/LinkButton';
import AppContext from 'context';
import NavMenu from './NavMenu';
import CartButton from './CartButton';
import Logo from './Logo';
import UserAvatar from './UserAvatar';

import './Header.scss';

function Header() {
  const appContext = useContext(AppContext);
  const isAuth = appContext?.isAuth;

  return (
    <AppBar component="header" position="static" color="transparent">
      <Toolbar sx={{ justifyContent: 'space-between', fontWeight: '700' }}>
        <Stack direction="row" alignItems="center">
          <Logo />
          <NavMenu />
        </Stack>
        <Stack direction="row" spacing={2}>
          <CartButton />
          {!isAuth && <LinkButton title="Sign in" link="/login" icon={<PersonIcon />} />}
          {!isAuth && <LinkButton title="Sign up" link="/registration" icon={<PersonAddIcon />} />}
          {isAuth && <UserAvatar />}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
