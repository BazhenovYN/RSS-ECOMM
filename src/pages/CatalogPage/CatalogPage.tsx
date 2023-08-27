import { DEFAULT_LANGUAGE } from 'constants/const';
import sortingDirections from 'constants/sortingDirections';
import { Grid, Stack, Typography } from '@mui/material';
import { searchProducts } from 'services/sdk/product';
import { useContext, useMemo, useState } from 'react';
import CatalogProductItem from 'components/CatalogProductItem';
import { Product } from 'types/types';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import AppContext from 'context';
import CatalogSorting from 'components/CatalogSorting';

function CatalogPage() {
  const appContext = useContext(AppContext);
  const language = appContext?.language;
  const sortingFieldNameValue = useMemo(() => `name.${language || DEFAULT_LANGUAGE}`, [language]);

  const [products, setProducts] = useState<Product[]>([]);
  const [sortingField, setSortingField] = useState(sortingFieldNameValue);
  const [sortingDirection, setSortingDirection] = useState(sortingDirections.ASC);

  const loadingLogic = useMemo(() => {
    return async () => {
      const searchedProducts = await searchProducts(sortingField, sortingDirection);
      setProducts(searchedProducts);
    };
  }, [sortingField, sortingDirection]);

  return (
    <ContentLoaderWrapper loadingLogic={loadingLogic}>
      <Stack gap={3} px={3}>
        <Typography component="h2" variant="h2">
          Catalog
        </Typography>
        <CatalogSorting
          sortingFieldNameValue={sortingFieldNameValue}
          sortingField={sortingField}
          setSortingField={setSortingField}
          sortingDirection={sortingDirection}
          setSortingDirection={setSortingDirection}
        />
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <CatalogProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ContentLoaderWrapper>
  );
}

export default CatalogPage;
