import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetails } from 'services/sdk/product';
import { Product } from 'types/types';
import ImageSlider from 'components/ImageSlider';
import { Grid, Stack, Typography } from '@mui/material';

function ProductPage() {
  const [product, setProduct] = useState<Product | undefined>();
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      const res = await getProductDetails(id);
      setProduct(res);
    };

    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  return (
    <div>
      <Typography component="h2" variant="h2" mb={2}>
        Product
      </Typography>
      <Grid container spacing={4} columns={{ xs: 6, md: 12 }}>
        <Grid item xs={6} md={4} minHeight={350}>
          <ImageSlider slides={product?.images ?? []} />
        </Grid>
        <Grid item xs={6} md={8}>
          <Stack spacing={2}>
            <Typography component="h3" variant="h3">
              {product?.name}
            </Typography>
            <Typography variant="body1">{product?.description}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductPage;
