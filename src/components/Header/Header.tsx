import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Stack, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import LinkButton from 'components/LinkButton/LinkButton';
import AuthContext from 'context';
import { logout } from 'services/sdk/customer';
import NavMenu from './NavMenu';
import CartButton from './CartButton';
import './Header.scss';

function Header() {
  const authContext = useContext(AuthContext);
  const isAuth = authContext?.isAuth;
  const setIsAuth = authContext?.setIsAuth;

  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    if (setIsAuth) {
      setIsAuth(false);
    }
    navigate('/');
  };
  return (
    <AppBar component="header" position="static" color="transparent">
      <Toolbar sx={{ justifyContent: 'space-between', fontWeight: '700' }}>
        <NavMenu />
        <Stack direction="row" spacing={2}>
          <CartButton />
          {!isAuth && <LinkButton title="Sign in" link="/login" icon={<PersonIcon />} />}
          {!isAuth && <LinkButton title="Sign up" link="/registration" icon={<PersonAddIcon />} />}
          {isAuth && (
            <Button variant="contained" startIcon={<LogoutIcon />} onClick={handleSignOut}>
              Sign out
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
