import { useContext, useState } from 'react';
import { Grid } from '@mui/material';
import CatalogProductItem from 'components/CatalogProductItem';
import Loader from 'components/Loader';
import AppContext from 'context';
import EmptyList from './EmptyList';

function ProductList() {
  const appContext = useContext(AppContext);
  const wishlist = appContext?.wishList;

  const [isLoading, setIsLoading] = useState(false);

  if (!wishlist || wishlist.products.length === 0) {
    return <EmptyList />;
  }

  return (
    <>
      {isLoading && <Loader transparent />}
      <Grid container spacing={3}>
        {wishlist.products.map((product) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
            <CatalogProductItem product={product} setWaitForCartUpdate={setIsLoading} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductList;
