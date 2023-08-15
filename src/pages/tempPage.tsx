import { Box, Button, Typography } from '@mui/material';
import AuthContext from 'context';
import { useContext } from 'react';

function TempPage() {
  const authContext = useContext(AuthContext);
  const isAuth = authContext?.isAuth;
  const setIsAuth = authContext?.setIsAuth;
  console.log(isAuth);

  const handleClick = () => {
    if (setIsAuth) {
      if (isAuth) {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5">TempPage</Typography>
      <Button onClick={handleClick}>Test Button</Button>
    </Box>
  );
}

// eslint-disable-next-line import/prefer-default-export
export { TempPage };
