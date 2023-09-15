import { useState, MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AppContext from 'context';
import { logout } from 'services/sdk/customer';
import { getActiveCart } from 'services/sdk/cart';

function UserProfileButton() {
  const appContext = useContext(AppContext);
  const setIsAuth = appContext?.setIsAuth;
  const setCart = appContext?.setCart;

  const navigate = useNavigate();

  const handleSignOut = async () => {
    logout();
    if (setIsAuth) setIsAuth(false);
    if (setCart) setCart(await getActiveCart(false));
    navigate('/');
  };

  const handleUserProfile = () => navigate('/profile');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Avatar sx={{ width: 32, height: 32 }}>
          <PersonIcon />
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={handleUserProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          User profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserProfileButton;
