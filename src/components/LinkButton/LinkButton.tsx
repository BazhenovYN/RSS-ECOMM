import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface ILinkButtonProps {
  title: string;
  link: string;
}

function LinkButton(props: ILinkButtonProps) {
  const { title, link } = props;
  return (
    <Button variant="contained" component={RouterLink} to={link}>
      {title}
    </Button>
  );
}

export default LinkButton;
