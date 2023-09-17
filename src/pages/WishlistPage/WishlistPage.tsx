import { Box, Typography } from '@mui/material';
import ProductList from 'components/ProductList';

function WishlistPage() {
  return (
    <Box>
      <Typography component="h2" variant="h2" mb={2}>
        Wishlist
      </Typography>
      <ProductList />
    </Box>
  );
}

export default WishlistPage;
