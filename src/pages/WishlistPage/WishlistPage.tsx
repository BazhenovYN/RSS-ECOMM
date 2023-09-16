import { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Loader from 'components/Loader';
import ProductList from 'components/ProductList';
import AppContext from 'context';
import { getProductDetails } from 'services/sdk/product';
import type { Product } from 'types/types';

function WishlistPage() {
  const appContext = useContext(AppContext);
  const wishlist = appContext?.wishList;

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const wishListItems = useMemo(() => wishlist?.lineItems || [], [wishlist]);

  useEffect(() => {
    const getProducts = async () => {
      const productsInfo = await Promise.all(wishListItems.map((item) => getProductDetails(item.productId)));
      setProducts(productsInfo);
    };
    getProducts();
  }, [wishListItems]);

  return (
    <Box>
      {isLoading && <Loader transparent />}
      <Typography component="h2" variant="h2" mb={2}>
        Wishlist
      </Typography>
      <ProductList products={products} setIsLoading={setIsLoading} />
    </Box>
  );
}

export default WishlistPage;
