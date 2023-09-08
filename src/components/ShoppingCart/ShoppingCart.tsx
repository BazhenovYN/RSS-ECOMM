import { DEFAULT_LANGUAGE } from 'constants/const';
import { useContext, useMemo, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import type { Cart } from '@commercetools/platform-sdk';
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
import { changeLineItemQuantity, deleteActiveCart, getActiveCart, removeLineItem } from 'services/sdk/cart';
import EmptyCard from './EmptyCard';

const getMoneyValue = (value: number, fractionDigits: number) => {
  return value / 10 ** fractionDigits;
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

  const isCartEmpty = !(cart && cart.lineItems.length > 0);

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
                  <TableCell align="right">Price, {cart.totalPrice.currencyCode}</TableCell>
                  <TableCell align="right">Discounted, {cart.totalPrice.currencyCode}</TableCell>
                  <TableCell align="right">Total, {cart.totalPrice.currencyCode}</TableCell>
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
                    <TableCell align="right">
                      {getMoneyValue(item.price.value.centAmount, item.price.value.fractionDigits)}
                    </TableCell>
                    <TableCell align="right">
                      {item.price.discounted
                        ? getMoneyValue(
                            item.price.discounted.value.centAmount,
                            item.price.discounted.value.fractionDigits
                          )
                        : '--'}
                    </TableCell>
                    <TableCell align="right">
                      {getMoneyValue(item.totalPrice.centAmount, item.totalPrice.fractionDigits)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" spacing={2} justifyContent="space-between" mt={2} mr={2}>
            <Button startIcon={<DeleteIcon />} onClick={clearshoppingCart}>
              Clear Shopping Cart
            </Button>
            <Stack direction="row">
              <Typography variant="h6">Total, {cart.totalPrice.currencyCode}:</Typography>
              <Typography component="div" variant="h6">
                {getMoneyValue(cart.totalPrice.centAmount, cart.totalPrice.fractionDigits)}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      )}
      {isCartEmpty && <EmptyCard />}
      {waitForCartUpdate && <Loader transparent />}
    </ContentLoaderWrapper>
  );
}

export default ShoppingCart;