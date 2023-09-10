import { DEFAULT_LANGUAGE } from 'constants/const';
import { useContext, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import type { Cart } from '@commercetools/platform-sdk';
import { Button, Container, Stack } from '@mui/material';
import AppContext from 'context';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import Loader from 'components/Loader';
import {
  addDiscountCode,
  changeLineItemQuantity,
  deleteActiveCart,
  getActiveCart,
  removeLineItem,
} from 'services/sdk/cart';
import EmptyCart from './EmptyCart';
import ProductTable from './ProductTable';
import PromoCode from './PromoCode';

function ShoppingCart() {
  const appContext = useContext(AppContext);
  const isAuth = appContext?.isAuth ?? false;
  const language = appContext?.language ?? DEFAULT_LANGUAGE;
  const setMessage = appContext?.setMessage;

  const [isCartUpdate, setIsCartUpdate] = useState(false);
  const [cart, setCart] = useState<Cart | null>();
  const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);

  const getCart = useMemo(() => {
    return async () => {
      const data = await getActiveCart(isAuth);
      setCart(data);
    };
  }, [isAuth]);

  const setProductQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart) return;
    try {
      setIsCartUpdate(true);
      const newCart = await changeLineItemQuantity(cart, lineItemId, quantity, isAuth);
      setCart(newCart);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsCartUpdate(false);
    }
  };

  const removeProduct = async (lineItemId: string) => {
    if (!cart) return;
    try {
      setIsCartUpdate(true);
      const newCart = await removeLineItem(cart, lineItemId, isAuth);
      setCart(newCart);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsCartUpdate(false);
    }
  };

  const clearShoppingCart = async () => {
    if (!cart) return;
    try {
      setIsCartUpdate(true);
      await deleteActiveCart(cart, isAuth);
      setCart(null);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsCartUpdate(false);
    }
  };

  const applyPromoCode = async (code: string) => {
    if (!cart) return;
    try {
      setIsCartUpdate(true);
      const newCart = await addDiscountCode(cart, code, isAuth);
      setCart(newCart);
      setIsPromoCodeApplied(true);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsCartUpdate(false);
    }
  };

  const isCartEmpty = !(cart && cart.lineItems.length > 0);
  const currency = cart?.totalPrice.currencyCode ?? '';

  return (
    <ContentLoaderWrapper loadingLogic={getCart}>
      {!isCartEmpty && (
        <Container maxWidth="lg">
          <ProductTable
            cart={cart}
            currency={currency}
            language={language}
            clearShoppingCart={clearShoppingCart}
            setProductQuantity={setProductQuantity}
            removeProduct={removeProduct}
          />
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={4}>
            <PromoCode onApply={applyPromoCode} disabled={isPromoCodeApplied} />
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Place order
            </Button>
          </Stack>
        </Container>
      )}
      {isCartEmpty && <EmptyCart />}
      {isCartUpdate && <Loader transparent />}
    </ContentLoaderWrapper>
  );
}

export default ShoppingCart;
