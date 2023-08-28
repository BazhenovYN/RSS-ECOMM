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
import SearchField from 'components/SearchField';

function CatalogPage() {
  const appContext = useContext(AppContext);
  const language = appContext?.language;

  const sortingNameParameter = useMemo(() => `name.${language || DEFAULT_LANGUAGE}`, [language]);
  const sortingPriceParameter = 'price';
  const searchTextParameter = useMemo(() => `text.${language || DEFAULT_LANGUAGE}`, [language]);

  const [products, setProducts] = useState<Product[]>([]);
  const [sortingField, setSortingField] = useState(sortingNameParameter);
  const [sortingDirection, setSortingDirection] = useState(sortingDirections.ASC);
  const [searchQuery, setSearchQuery] = useState('');

  const loadingLogic = useMemo(() => {
    return async () => {
      const searchedProducts = await searchProducts(searchTextParameter, searchQuery, sortingField, sortingDirection);
      setProducts(searchedProducts);
    };
  }, [searchTextParameter, searchQuery, sortingField, sortingDirection]);

  const onSearch = (searchFieldValue: string) => {
    setSearchQuery(searchFieldValue);
  };

  const onChangeSortingField = (sortingFieldValue: string) => {
    setSortingField(sortingFieldValue);
  };

  const onChangeSortingDirection = (sortingDirectionValue: string) => {
    setSortingDirection(sortingDirectionValue);
  };

  return (
    <Stack gap={3} px={3} height="100%">
      <Typography component="h2" variant="h2">
        Catalog
      </Typography>
      <Stack direction="row" alignItems="center" gap={3}>
        <SearchField onSearch={onSearch} />
        <CatalogSorting
          sortingPriceParameter={sortingPriceParameter}
          sortingNameParameter={sortingNameParameter}
          onChangeSortingField={onChangeSortingField}
          onChangeSortingDirection={onChangeSortingDirection}
        />
      </Stack>
      <ContentLoaderWrapper loadingLogic={loadingLogic}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <CatalogProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      </ContentLoaderWrapper>
    </Stack>
  );
}

export default CatalogPage;
