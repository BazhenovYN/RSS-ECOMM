import { Grid } from '@mui/material';
import type { Cart } from '@commercetools/platform-sdk';
import type { Language } from 'types/types';
import ProductCard from '../ProductCard';

interface IProps {
  cart: Cart;
  currency: string;
  language: Language;
  setProductQuantity: (lineItemId: string, quantity: number) => void;
  removeProduct: (lineItemId: string) => void;
}

function ProductCardList({ cart, currency, language, setProductQuantity, removeProduct }: IProps) {
  return (
    <Grid container spacing={3} data-testid="product-card-list">
      {cart.lineItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
          <ProductCard
            item={item}
            currency={currency}
            language={language}
            setProductQuantity={setProductQuantity}
            removeProduct={removeProduct}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductCardList;
