import { DEFAULT_LANGUAGE } from 'constants/const';
import { useContext, useMemo, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AddIcon from '@mui/icons-material/Add';
import type { Cart, LineItem, TypedMoney } from '@commercetools/platform-sdk';
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import AppContext from 'context';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import Counter from 'components/Counter';
import Loader from 'components/Loader';
import {
  addDiscountCode,
  changeLineItemQuantity,
  deleteActiveCart,
  getActiveCart,
  removeLineItem,
} from 'services/sdk/cart';
import EmptyCart from './EmptyCart';
import PromoCode from './PromoCode';

const getMoneyValue = (price: TypedMoney) => {
  return (price.centAmount / 10 ** price.fractionDigits).toFixed(price.fractionDigits);
};

const getDiscountedValue = (item: LineItem): string => {
  if (item.discountedPricePerQuantity && item.discountedPricePerQuantity.length > 0) {
    const price = item.discountedPricePerQuantity[0].discountedPrice.value;
    return getMoneyValue(price);
  }
  if (item.price.discounted) {
    const price = item.price.discounted.value;
    return getMoneyValue(price);
  }
  return '--';
};

function ShoppingCart() {
  const appContext = useContext(AppContext);
  const isAuth = appContext?.isAuth ?? false;
  const language = appContext?.language ?? DEFAULT_LANGUAGE;
  const setMessage = appContext?.setMessage;

  const [waitForCartUpdate, setWaitForCartUpdate] = useState(false);

  const [cart, setCart] = useState<Cart | null>();

  const getCart = useMemo(() => {
    return async () => {
      const data = await getActiveCart(isAuth);
      setCart(data);
    };
  }, [isAuth]);

  const setProductQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart) return;
    try {
      setWaitForCartUpdate(true);
      const newCart = await changeLineItemQuantity(cart, lineItemId, quantity, isAuth);
      setCart(newCart);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setWaitForCartUpdate(false);
    }
  };

  const removeProduct = async (lineItemId: string) => {
    if (!cart) return;
    try {
      setWaitForCartUpdate(true);
      const newCart = await removeLineItem(cart, lineItemId, isAuth);
      setCart(newCart);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setWaitForCartUpdate(false);
    }
  };

  const clearshoppingCart = async () => {
    if (!cart) return;
    try {
      setWaitForCartUpdate(true);
      await deleteActiveCart(cart, isAuth);
      setCart(null);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setWaitForCartUpdate(false);
    }
  };

  const applyPromoCode = async (code: string) => {
    if (!cart) return;
    try {
      setWaitForCartUpdate(true);
      const newCart = await addDiscountCode(cart, code, isAuth);
      setCart(newCart);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setWaitForCartUpdate(false);
    }
  };

  const isCartEmpty = !(cart && cart.lineItems.length > 0);
  const currency = cart?.totalPrice.currencyCode;

  return (
    <ContentLoaderWrapper loadingLogic={getCart}>
      {!isCartEmpty && (
        <Container maxWidth="lg">
          <TableContainer component={Paper} sx={{ borderColor: 'primary.main' }}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead sx={{ backgroundColor: 'primary.main' }}>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Price, {currency}</TableCell>
                  <TableCell align="right">Discounted, {currency}</TableCell>
                  <TableCell align="right">Total, {currency}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.lineItems.map((item, index) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      {index + 1}
                      <IconButton sx={{ ml: 1 }} onClick={() => removeProduct(item.id)}>
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{item.name[language]}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          width: '100px',
                          height: '70px',
                          backgroundColor: 'black',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundImage: `url(${item.variant.images ? item.variant.images[0].url : ''})`,
                          backgroundSize: 'cover',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Counter
                          count={item.quantity}
                          setCount={(quantity: number) => {
                            setProductQuantity(item.id, quantity);
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">{getMoneyValue(item.price.value)}</TableCell>
                    <TableCell align="right">{getDiscountedValue(item)}</TableCell>
                    <TableCell align="right">{getMoneyValue(item.totalPrice)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" spacing={2} justifyContent="space-between" mt={2} mr={2} mb={6}>
            <Button startIcon={<DeleteIcon />} onClick={clearshoppingCart}>
              Clear Shopping Cart
            </Button>
            <Stack direction="row" spacing={1}>
              <Typography variant="h6">Total, {currency}:</Typography>
              <Typography component="div" variant="h6">
                {getMoneyValue(cart.totalPrice)}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={4}>
            <PromoCode onApply={applyPromoCode} />
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              Place order
            </Button>
          </Stack>
        </Container>
      )}
      {isCartEmpty && <EmptyCart />}
      {waitForCartUpdate && <Loader transparent />}
    </ContentLoaderWrapper>
  );
}

export default ShoppingCart;
