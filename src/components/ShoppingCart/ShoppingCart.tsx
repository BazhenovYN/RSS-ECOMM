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

const getMoneyValue = (value: number, fractionDigits: number) => {
  return value / 10 ** fractionDigits;
};

function ShoppingCart() {
  const appContext = useContext(AppContext);
  const language = appContext?.language ?? DEFAULT_LANGUAGE;

  const [cart, setCart] = useState<Cart | null>();

  const getCart = useMemo(() => {
    return async () => {
      try {
        const data = await getActiveCart();
        setCart(data);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === 'NotFound') {
            setCart(null);
            return;
          }
        }
        throw error;
      }
    };
  }, []);

  return (
    <ContentLoaderWrapper loadingLogic={getCart}>
      {cart && (
        <Container maxWidth="lg">
          <TableContainer component={Paper} sx={{ borderColor: 'primary.main' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
              {cart.totalPrice.centAmount / 10 ** cart.totalPrice.fractionDigits}
            </Typography>
          </Stack>
        </Container>
      )}
      {!cart && <Typography variant="h4">Shopping basket is empty...</Typography>}
    </ContentLoaderWrapper>
  );
}

export default ShoppingCart;
