import { Card, CardActions, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Counter from 'components/Counter';
import type { LineItem } from '@commercetools/platform-sdk';
import type { Language } from 'types/types';
import { getDiscountedValue, getMoneyValue } from '../utils';

interface IProps {
  item: LineItem;
  currency: string;
  language: Language;
  setProductQuantity: (lineItemId: string, quantity: number) => void;
  removeProduct: (lineItemId: string) => void;
}

function ProductCard({ item, currency, language, setProductQuantity, removeProduct }: IProps) {
  return (
    <Card data-testid="product-card">
      <CardMedia component="img" height="200" image={item.variant.images ? item.variant.images[0].url : ''} />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {item.name[language]}
        </Typography>
        <Typography>Price: {getMoneyValue(item.price.value)}</Typography>
        <Typography>Discounted: {getDiscountedValue(item)}</Typography>
        <Typography mt={2} fontWeight="bold">
          Total, {currency}: {getMoneyValue(item.totalPrice)}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" justifyContent="space-between" width={1}>
          <IconButton sx={{ ml: 1 }} onClick={() => removeProduct(item.id)}>
            <DeleteForeverRoundedIcon />
          </IconButton>
          <Counter count={item.quantity} setCount={(quantity: number) => setProductQuantity(item.id, quantity)} />
        </Stack>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
