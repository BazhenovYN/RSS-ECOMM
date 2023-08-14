import { AppBar, Toolbar } from '@mui/material';
import Logo from './Logo';
import NavMenu from './NavMenu';
import CartButton from './CartButton';
import LogInButton from './LogInButton';

function Header() {
  return (
    <AppBar component="header" position="static" color="transparent">
      <Toolbar sx={{ justifyContent: 'space-between', fontWeight: '700' }}>
        <Logo />

        <NavMenu />

        <CartButton />

        <LogInButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
