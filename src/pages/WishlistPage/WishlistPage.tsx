import { useContext, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import ProductList from 'components/ProductList';
import AppContext from 'context';
import { getProductDetails } from 'services/sdk/product';
import type { Product } from 'types/types';

function WishlistPage() {
  const appContext = useContext(AppContext);
  const wishlist = appContext?.wishList;

  const [products, setProducts] = useState<Product[]>([]);

  const wishListItems = useMemo(() => wishlist?.lineItems || [], [wishlist]);

  const getProducts = useMemo(() => {
    return async () => {
      const productsInfo = await Promise.all(wishListItems.map((item) => getProductDetails(item.productId)));
      setProducts(productsInfo);
    };
  }, [wishListItems]);

  return (
    <ContentLoaderWrapper loadingLogic={getProducts}>
      <Box>
        <Typography component="h2" variant="h2" mb={2}>
          Wishlist
        </Typography>
        <ProductList products={products} />
      </Box>
    </ContentLoaderWrapper>
  );
}

export default WishlistPage;
