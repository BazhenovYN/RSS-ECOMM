import { useState } from 'react';
import { Box, Drawer, IconButton, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavLink from './NavLink';

interface IMenuItem {
  title: string;
  link: string;
  key: string;
}

function NavMenu() {
  const menuItems: IMenuItem[] = [
    { title: 'Home', link: '/', key: 'home' },
    { title: 'Catalog', link: '/catalog', key: 'catalog' },
    { title: 'About Us', link: '/about-us', key: 'about-us' },
  ];

  const [open, setOpen] = useState(false);

  return (
    <Box component="nav" ml={0}>
      <Stack display={{ xs: 'none', md: 'flex' }} direction="row" spacing={2}>
        {menuItems.map((item) => (
          <NavLink key={item.key} title={item.title} link={item.link} />
        ))}
      </Stack>
      <IconButton sx={{ display: { md: 'none' }, width: '40px', height: '40px' }} onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)} sx={{ display: { md: 'none' } }}>
        <Stack
          component="nav"
          direction="column"
          my={4}
          ml={2}
          spacing={2}
          sx={{ minWidth: '200px' }}
          onClick={() => setOpen(false)}>
          {menuItems.map((item) => (
            <NavLink key={item.key} title={item.title} link={item.link} />
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}

export default NavMenu;
