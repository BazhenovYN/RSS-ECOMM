import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { getProducts } from 'services/sdk/product';
import { useContext, useEffect, useState } from 'react';
import { ProductProjection } from '@commercetools/platform-sdk';
import AppContext from 'context';
import CatalogProductItem from 'components/CatalogProductItem';

function CatalogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductProjection[]>([]);

  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;

  useEffect(() => {
    getProducts()
      .then((productsData) => setProducts(productsData.results))
      .catch((error) => {
        if (setMessage)
          setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
      })
      .finally(() => setIsLoading(false));
  }, [setMessage]);

  return isLoading ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <CircularProgress />
    </Box>
  ) : (
    <Box px={3}>
      <Typography component="h2" variant="h2" mb={2}>
        Catalog
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <CatalogProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CatalogPage;
