import { DEFAULT_LANGUAGE } from 'constants/const';
import { useCallback, useContext, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AppContext from 'context';
import Loader from 'components/Loader';
import {
  addDiscountCode,
  changeLineItemQuantity,
  deleteActiveCart,
  getDiscountCode,
  removeDiscountCode,
  removeLineItem,
} from 'services/sdk/cart';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import EmptyCart from './EmptyCart';
import Products from './Products';
import PromoCode from './PromoCode';
import { getDiscountID, getMoneyValue, getTotalPriceWithoutDiscount } from './utils';

function ShoppingCart() {
  const appContext = useContext(AppContext);
  const language = appContext?.language ?? DEFAULT_LANGUAGE;
  const setMessage = appContext?.setMessage;
  const cart = appContext?.cart;
  const setCart = appContext?.setCart;

  const [isMounted, setIsMounted] = useState(false);
  const [isCartUpdate, setIsCartUpdate] = useState(false);
  const [promoCode, setPromoCode] = useState<string | undefined>();

  const getDiscount = useCallback(async () => {
    if (!cart || isMounted) {
      return;
    }
    const discountID = getDiscountID(cart);
    if (discountID) {
      const discount = await getDiscountCode(discountID);
      setPromoCode(discount.code);
    }
    setIsMounted(true);
  }, [cart, isMounted]);

  const handleCartOperation = async (operation: Function, ...args: (string | number | boolean)[]): Promise<boolean> => {
    if (!cart) return false;
    try {
      setIsCartUpdate(true);
      const newCart = await operation(cart, ...args);
      if (setCart) setCart(newCart);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (setMessage) setMessage({ severity: 'error', text: errorMessage });
      return false;
    } finally {
      setIsCartUpdate(false);
    }
  };

  const setProductQuantity = (lineItemId: string, quantity: number) =>
    handleCartOperation(changeLineItemQuantity, lineItemId, quantity);

  const removeProduct = (lineItemId: string) => handleCartOperation(removeLineItem, lineItemId);

  const clearShoppingCart = () => handleCartOperation(deleteActiveCart);

  const applyPromoCode = async (code: string) => {
    const isCodeApplied = await handleCartOperation(addDiscountCode, code);
    if (isCodeApplied) {
      setPromoCode(code);
    }
  };

  const resetPromoCode = async () => {
    if (!cart) return;
    const discountID = getDiscountID(cart);
    if (discountID) {
      await handleCartOperation(removeDiscountCode, discountID);
    }
    setPromoCode(undefined);
  };

  const isCartEmpty = !(cart && cart.lineItems.length > 0);
  const totalPrice = cart ? getMoneyValue(cart.totalPrice) : null;
  const totalPriceWithoutDiscount = cart ? getTotalPriceWithoutDiscount(cart) : null;
  const currency = cart?.totalPrice.currencyCode ?? '';

  return (
    <>
      {!isCartEmpty && (
        <Container maxWidth="lg">
          <Products
            cart={cart}
            currency={currency}
            language={language}
            setProductQuantity={setProductQuantity}
            removeProduct={removeProduct}
          />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            mt={2}
            mr={2}
            mb={6}>
            <Button startIcon={<DeleteIcon />} onClick={clearShoppingCart}>
              Clear Shopping Cart
            </Button>
            <Box>
              {totalPriceWithoutDiscount !== totalPrice && (
                <Typography textAlign={{ xs: 'center', sm: 'right' }} color="grey.600">
                  <s>
                    {currency} {totalPriceWithoutDiscount}
                  </s>
                </Typography>
              )}
              {totalPrice && (
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Typography variant="h6">Total, {currency}:</Typography>
                  <Typography component="div" variant="h6">
                    {totalPrice}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={4}>
            <ContentLoaderWrapper loadingLogic={getDiscount}>
              <Box display="flex" justifyContent="center">
                <PromoCode onApply={applyPromoCode} onReset={resetPromoCode} code={promoCode} disabled={!!promoCode} />
              </Box>
            </ContentLoaderWrapper>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ maxWidth: 'max-content', py: 2 }}>
                Place order
              </Button>
            </Box>
          </Stack>
        </Container>
      )}
      {isCartEmpty && <EmptyCart />}
      {isCartUpdate && <Loader transparent />}
    </>
  );
}

export default ShoppingCart;
