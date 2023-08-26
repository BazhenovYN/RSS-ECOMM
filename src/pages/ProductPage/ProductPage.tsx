import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { fetchProductDetails } from 'services/sdk/product';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import AppContext from 'context';
import ImageSlider from 'components/ImageSlider';
import FullScreenImageSlider from 'components/FullScreenImageSlider';
import PriceField from 'components/PriceField';
import type { Product } from 'types/types';
import Counter from 'components/Counter';

function ProductPage() {
  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;
  const setIsLoading = appContext?.setIsLoading;

  const [product, setProduct] = useState<Product | undefined>();
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      if (setIsLoading) {
        setIsLoading(true);
      }
      try {
        const res = await fetchProductDetails(id);
        setProduct(res);
      } catch (error) {
        if (setMessage) {
          setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
        }
      } finally {
        if (setIsLoading) setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, setIsLoading, setMessage]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [currentImage, setCurrentImage] = useState(0);
  const [count, setCount] = useState(1);

  return (
    <Box>
      <Typography component="h2" variant="h2" mb={2}>
        Product
      </Typography>
      <Grid container spacing={4} columns={{ xs: 6, md: 12 }}>
        <Grid item xs={6} md={4} minHeight={350} borderRadius={4} onClick={handleOpenModal}>
          <ImageSlider slides={product?.images ?? []} currentSlide={currentImage} onChange={setCurrentImage} />
        </Grid>
        <Grid item xs={6} md={8}>
          <Stack spacing={2}>
            <Typography component="h3" variant="h3">
              {product?.name}
            </Typography>
            <PriceField product={product} />
            <Typography variant="body1">{product?.description}</Typography>
            <Stack direction="row" spacing={2}>
              <Counter count={count} setCount={setCount} />
              <Button variant="contained">Add to basket</Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <FullScreenImageSlider
        slides={product?.images ?? []}
        open={openModal}
        onChange={setCurrentImage}
        onClose={handleCloseModal}
        currentSlide={currentImage}
      />
    </Box>
  );
}

export default ProductPage;
