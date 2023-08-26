import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductDetails } from 'services/sdk/product';
import { Box, Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ImageSlider from 'components/ImageSlider';
import FullScreenImageSlider from 'components/FullScreenImageSlider';
import PriceField from 'components/PriceField';
import type { Product } from 'types/types';

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
          <ImageSlider slides={product?.images ?? []} isCover onChange={setCurrentImage} />
        </Grid>
        <Grid item xs={6} md={8}>
          <Stack spacing={2}>
            <Typography component="h3" variant="h3">
              {product?.name}
            </Typography>
            <PriceField product={product} />
            <Typography variant="body1">{product?.description}</Typography>
            <Stack direction="row" spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton onClick={() => (count > 1 ? setCount(count - 1) : 1)}>
                  <RemoveIcon />
                </IconButton>
                <Box component="span" minWidth={20} textAlign="center">
                  {count}
                </Box>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Stack>
              <Button variant="contained">Add to basket</Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <FullScreenImageSlider
        slides={product?.images ?? []}
        open={openModal}
        onClose={handleCloseModal}
        firstSlide={currentImage}
      />
    </Box>
  );
}

export default ProductPage;
