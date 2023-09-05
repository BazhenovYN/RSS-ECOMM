import { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import AppContext from 'context';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
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

  const [product, setProduct] = useState<Product | undefined>();
  const { productId } = useParams();

  const getProduct = useMemo(() => {
    return async () => {
      const data = await getProductDetails(productId);
      setProduct(data);
    };
  }, [productId]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(1);

  return (
    <ContentLoaderWrapper loadingLogic={getProduct}>
      <Box>
        <Typography component="h2" variant="h2" mb={2}>
          Product
        </Typography>
        <Grid container spacing={4} columns={{ xs: 6, md: 12 }}>
          <Grid item xs={6} md={4} minHeight={350} borderRadius={4} onClick={handleOpenModal}>
            <ImageSlider slides={product?.images ?? []} currentSlide={currentSlide} onChange={setCurrentSlide} />
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
          onChange={setCurrentSlide}
          onClose={handleCloseModal}
          currentSlide={currentSlide}
        />
      </Box>
    </ContentLoaderWrapper>
  );
}

export default ProductPage;
