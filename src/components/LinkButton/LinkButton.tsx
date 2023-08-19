import { Button } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface IProps {
  title: string;
  link: string;
  icon?: React.ReactNode;
}

function LinkButton({ title, link, icon }: IProps) {
  return (
    <Button variant="contained" component={RouterLink} to={link} startIcon={icon}>
      {title}
    </Button>
  );
}

export default LinkButton;
