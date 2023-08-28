import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import AppContext from 'context';
import Counter from 'components/Counter';
import ImageSlider from 'components/ImageSlider';
import FullScreenImageSlider from 'components/FullScreenImageSlider';
import PriceField from 'components/PriceField';
import { getProductDetails } from 'services/sdk/product';
import { getProductDescription, getProductName } from 'utils/utils';
import type { Product } from 'types/types';

function ProductPage() {
  const appContext = useContext(AppContext);
  const language = appContext?.language;
  const setMessage = appContext?.setMessage;

  const [product, setProduct] = useState<Product | undefined>();
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        const res = await getProductDetails(id);
        setProduct(res);
      } catch (error) {
        if (setMessage) {
          setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
        }
      }
    };

    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, language, setMessage]);

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
              {getProductName(product, language)}
            </Typography>
            <PriceField product={product} />
            <Typography variant="body1">{getProductDescription(product, language)}</Typography>
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
