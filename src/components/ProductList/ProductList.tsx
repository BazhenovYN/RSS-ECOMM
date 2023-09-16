import { Dispatch, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import CatalogProductItem from 'components/CatalogProductItem';
import type { Cart } from '@commercetools/platform-sdk';
import type { Product } from 'types/types';

interface IProps {
  products: Product[];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  cart?: Cart;
}

function ProductList({ cart, products, setIsLoading }: IProps) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
          <CatalogProductItem product={product} setWaitForCartUpdate={setIsLoading} cart={cart} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
