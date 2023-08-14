import { Link as RouterLink } from 'react-router-dom';
import { Typography } from '@mui/material';

interface ILinkProps {
  title: string;
  link: string;
}

function NavLink(props: ILinkProps) {
  const { title, link } = props;

  return (
    <Typography variant="h6" component={RouterLink} to={link} sx={{ textDecoration: 'none' }}>
      {title}
    </Typography>
  );
}

export default NavLink;
