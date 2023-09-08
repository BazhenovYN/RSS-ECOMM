import { DEFAULT_LANGUAGE } from 'constants/const';
import { useContext, useMemo, useState } from 'react';
import type { Cart } from '@commercetools/platform-sdk';
import {
  Box,
  Container,
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
import { getActiveCart } from 'services/sdk/cart';
import EmptyCard from './EmptyCard';

const getMoneyValue = (value: number, fractionDigits: number) => {
  return value / 10 ** fractionDigits;
};

function ShoppingCart() {
  const appContext = useContext(AppContext);
  const isAuth = appContext?.isAuth;
  const language = appContext?.language ?? DEFAULT_LANGUAGE;

  const [cart, setCart] = useState<Cart | null>();

  const getCart = useMemo(() => {
    return async () => {
      const data = await getActiveCart(isAuth);
      setCart(data);
    };
  }, [isAuth]);

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
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price, {cart.totalPrice.currencyCode}</TableCell>
                  <TableCell align="right">Discounted, {cart.totalPrice.currencyCode}</TableCell>
                  <TableCell align="right">Total, {cart.totalPrice.currencyCode}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.lineItems.map((item, index) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{index + 1}</TableCell>
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
                    <TableCell align="right">{item.quantity}</TableCell>
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
          <Stack direction="row" spacing={2} justifyContent="end" mt={2} mr={2}>
            <Typography variant="h6">Total, {cart.totalPrice.currencyCode}:</Typography>
            <Typography component="div" variant="h6">
              {getMoneyValue(cart.totalPrice.centAmount, cart.totalPrice.fractionDigits)}
            </Typography>
          </Stack>
        </Container>
      )}
      {isCartEmpty && <EmptyCard />}
    </ContentLoaderWrapper>
  );
}

export default ShoppingCart;
