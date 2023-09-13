import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
import { addToCart, getActiveCart, removeLineItem } from 'services/sdk/cart';
import { Cart } from '@commercetools/platform-sdk';
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
  const [count, setCount] = useState(1);

  const [cart, setCart] = useState<Cart | null>(null);
  const [isInCart, setIsInCart] = useState(false);
  const [waitForCartUpdate, setWaitForCartUpdate] = useState(false);
  const lineItemId = useMemo(() => findCartItemInCart(cart?.lineItems || [], productId)?.id ?? '', [cart, productId]);

  const updateProductFromNewCart = useCallback(
    (newCart: Cart | null) => {
      if (!productId) {
        if (setMessage) setMessage({ severity: 'error', text: 'Product not found' });
        return;
      }

      const lineItem = findCartItemInCart(newCart?.lineItems || [], productId);
      if (lineItem) {
        setIsInCart(true);
        setCount(lineItem.quantity);
      } else {
        setIsInCart(false);
      }
    },
    [productId, setMessage]
  );

  useEffect(() => {
    updateProductFromNewCart(cart);
  }, [cart, updateProductFromNewCart]);

  const getProduct = useCallback(async () => {
    const data = await getProductDetails(productId);
    setProduct(data);
    const newCart = await getActiveCart(isAuth);
    setCart(newCart);
    updateProductFromNewCart(newCart);
  }, [productId, isAuth, updateProductFromNewCart]);

  const handleCartOperation = async (
    operation: Function,
    successMessage: string,
    ...args: (string | number | boolean)[]
  ) => {
    if (!cart) {
      if (setMessage) setMessage({ severity: 'error', text: 'Cart not found' });
      return;
    }

    try {
      setWaitForCartUpdate(true);
      const newCart = await operation(cart, ...args);
      setCart(newCart);
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
    handleCartOperation(removeLineItem, 'Product has been successfully removed from cart', lineItemId, isAuth);

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
                <Counter count={count} setCount={setCount} disabled={isInCart} />
                <Button variant="contained" onClick={handleAddToBasket} disabled={isInCart}>
                  Add to basket
                </Button>
                <Button variant="contained" onClick={handleDeleteFromBasket} disabled={!isInCart}>
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
