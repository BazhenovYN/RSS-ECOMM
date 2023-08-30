import { Box, Grid, Typography } from '@mui/material';
import { getProducts } from 'services/sdk/product';
import { useMemo, useState } from 'react';
import CatalogProductItem from 'components/CatalogProductItem';
import { Product } from 'types/types';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';

function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const loadingLogic = useMemo(() => {
    return async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
  }, []);

  return (
    <ContentLoaderWrapper loadingLogic={loadingLogic}>
      <Box>
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
    </ContentLoaderWrapper>
  );
}

export default CatalogPage;
