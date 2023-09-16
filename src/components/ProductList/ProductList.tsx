import { useState } from 'react';
import { Grid } from '@mui/material';
import CatalogProductItem from 'components/CatalogProductItem';
import Loader from 'components/Loader';
import type { Product } from 'types/types';
import EmptyList from './EmptyList';

interface IProps {
  products: Product[];
}

function ProductList({ products }: IProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (products.length === 0) {
    return <EmptyList />;
  }

  return (
    <>
      {isLoading && <Loader transparent />}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
            <CatalogProductItem product={product} setWaitForCartUpdate={setIsLoading} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductList;
