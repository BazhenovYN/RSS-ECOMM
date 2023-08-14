import { Stack } from '@mui/material';
import NavLink from './NavLink';

interface IPageProps {
  title: string;
  link: string;
  key: string;
}

const pages: IPageProps[] = [
  { title: 'Home', link: '/', key: 'home' },
  { title: 'Blog', link: '/blog', key: 'blog' },
  { title: 'Contacts', link: '/contacts', key: 'contacts' },
  { title: 'About Us', link: '/about-us', key: 'about-us' },
];

function NavMenu() {
  return (
    <Stack direction="row" spacing={2}>
      {pages.map((page) => (
        <NavLink key={page.key} title={page.title} link={page.link} />
      ))}
    </Stack>
  );
}

export default NavMenu;
