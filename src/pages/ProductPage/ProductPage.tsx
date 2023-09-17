import { useCallback, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import AppContext from 'context';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import Counter from 'components/Counter';
import ImageSlider from 'components/ImageSlider';
import FullScreenImageSlider from 'components/FullScreenImageSlider';
import PriceField from 'components/PriceField';
import { getProductDetails } from 'services/sdk/product';
import { getProductDescription, getProductName, findCartItemInCart } from 'utils/utils';
import type { Product } from 'types/types';
import { addToCart, createCart, removeLineItem } from 'services/sdk/cart';
import Loader from 'components/Loader';

function ProductPage() {
  const appContext = useContext(AppContext);
  const language = appContext?.language;
  const isAuth = appContext?.isAuth ?? false;
  const setMessage = appContext?.setMessage;

  const [product, setProduct] = useState<Product | undefined>();
  const productId = useParams().productId ?? '';

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const cart = appContext?.cart;
  const setCart = appContext?.setCart;
  const [waitForCartUpdate, setWaitForCartUpdate] = useState(false);
  const lineItem = useMemo(() => findCartItemInCart(cart?.lineItems || [], productId), [cart, productId]);
  const [count, setCount] = useState(() => lineItem?.quantity || 1);

  const getProduct = useCallback(async () => {
    const data = await getProductDetails(productId);
    setProduct(data);
  }, [productId]);

  const handleCartOperation = async (
    operation: Function,
    successMessage: string,
    ...args: (string | number | boolean)[]
  ) => {
    setWaitForCartUpdate(true);
    try {
      let newCart = cart || (await createCart());
      newCart = await operation(newCart, ...args);
      if (setCart) setCart(newCart);
      if (setMessage) setMessage({ severity: 'success', text: successMessage });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (setMessage) setMessage({ severity: 'error', text: errorMessage });
    } finally {
      setWaitForCartUpdate(false);
    }
  };

  const handleAddToBasket = async () =>
    handleCartOperation(addToCart, 'Product has been successfully added to cart', productId, isAuth, count);

  const handleDeleteFromBasket = async () =>
    handleCartOperation(removeLineItem, 'Product has been successfully removed from cart', lineItem?.id || '', isAuth);

  return (
    <ContentLoaderWrapper loadingLogic={getProduct}>
      {waitForCartUpdate && <Loader transparent />}
      <Box>
        <Typography component="h2" variant="h2" mb={2}>
          Product
        </Typography>
        <Grid container spacing={4} columns={{ xs: 6, md: 12 }}>
          <Grid item xs={6} md={4} minHeight={350} borderRadius={4} onClick={handleOpenModal}>
            <ImageSlider slides={product?.images ?? []} currentSlide={currentSlide} onChange={setCurrentSlide} />
          </Grid>
          <Grid item xs={6} md={8}>
            <Stack spacing={2} alignItems="flex-start">
              <Typography component="h3" variant="h3">
                {getProductName(product, language)}
              </Typography>
              <PriceField product={product} />
              <Typography variant="body1">{getProductDescription(product, language)}</Typography>
              <Stack direction="row" spacing={2}>
                <Counter count={count} setCount={setCount} disabled={!!lineItem} />
                <Button variant="contained" onClick={handleAddToBasket} disabled={!!lineItem}>
                  Add to basket
                </Button>
                <Button variant="contained" onClick={handleDeleteFromBasket} disabled={!lineItem}>
                  Remove from basket
                </Button>
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
