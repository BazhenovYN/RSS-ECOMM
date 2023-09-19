import { NavLink as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material';

interface ILinkProps {
  title: string;
  link: string;
}

function NavLink({ title, link }: ILinkProps) {
  return (
    <Typography variant="button" component={RouterLink} to={link} color="textPrimary">
      {title}
    </Typography>
  );
}

export default NavLink;
