import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Counter from 'components/Counter';
import type { Cart } from '@commercetools/platform-sdk';
import type { Language } from 'types/types';
import { getDiscountedValue, getMoneyValue } from '../utils';

interface IProps {
  cart: Cart;
  currency: string;
  language: Language;
  setProductQuantity: (lineItemId: string, quantity: number) => void;
  removeProduct: (lineItemId: string) => void;
}

function ProductTable({ cart, currency, language, setProductQuantity, removeProduct }: IProps) {
  return (
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
                    setCount={(quantity: number) => setProductQuantity(item.id, quantity)}
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
  );
}

export default ProductTable;
