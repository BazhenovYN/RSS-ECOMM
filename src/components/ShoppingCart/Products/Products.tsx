import { useMediaQuery, useTheme } from '@mui/material';
import type { Cart } from '@commercetools/platform-sdk';
import type { Language } from 'types/types';
import ProductCardList from '../ProductCardList';
import ProductTable from '../ProductTable';

interface IProps {
  cart: Cart;
  currency: string;
  language: Language;
  setProductQuantity: (lineItemId: string, quantity: number) => void;
  removeProduct: (lineItemId: string) => void;
}

function Products({ cart, currency, language, setProductQuantity, removeProduct }: IProps) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      {isLargeScreen && (
        <ProductTable
          cart={cart}
          currency={currency}
          language={language}
          setProductQuantity={setProductQuantity}
          removeProduct={removeProduct}
        />
      )}
      {!isLargeScreen && (
        <ProductCardList
          cart={cart}
          currency={currency}
          language={language}
          setProductQuantity={setProductQuantity}
          removeProduct={removeProduct}
        />
      )}
    </>
  );
}

export default Products;
