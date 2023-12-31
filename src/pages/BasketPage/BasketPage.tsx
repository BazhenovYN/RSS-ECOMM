import { Box, Typography } from '@mui/material';
import ShoppingCart from 'components/ShoppingCart';

function BasketPage() {
  return (
    <Box>
      <Typography component="h2" variant="h2" mb={2}>
        Basket
      </Typography>
      <ShoppingCart />
    </Box>
  );
}

export default BasketPage;
