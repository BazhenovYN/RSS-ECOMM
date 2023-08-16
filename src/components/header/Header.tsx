import { AppBar, Toolbar, Stack } from '@mui/material';
import LinkButton from 'components/LinkButton/LinkButton';
import Logo from './Logo';
import NavMenu from './NavMenu';
import CartButton from './CartButton';

function Header() {
  const isAuth = false;

  return (
    <AppBar component="header" position="static" color="transparent">
      <Toolbar sx={{ justifyContent: 'space-between', fontWeight: '700' }}>
        <Logo />

        <NavMenu />

        <CartButton />

        <Stack direction="row" spacing={2}>
          {!isAuth && <LinkButton title="Log In" link="/log-in" />}
          {!isAuth && <LinkButton title="Registration" link="/" />}
          {isAuth && <LinkButton title="Log Out" link="/" />}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
