import { DEFAULT_LANGUAGE } from 'constants/const';
import sortingDirections from 'constants/sortingDirections';
import { Grid, Stack, Typography } from '@mui/material';
import { searchProducts } from 'services/sdk/product';
import { useContext, useMemo, useState } from 'react';
import CatalogProductItem from 'components/CatalogProductItem';
import { Product, SelectedAttributesList } from 'types/types';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import AppContext from 'context';
import CatalogSorting from 'components/CatalogSorting';
import SearchField from 'components/SearchField';
import AttributesFilter from 'components/AttributesFilter/AttributesFilter';

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
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributesList>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const loadingLogic = useMemo(() => {
    return async () => {
      setIsFiltered(false);
      const searchedProducts = await searchProducts(searchTextParameter, searchQuery, sortingField, sortingDirection);
      setProducts(searchedProducts);

      if (Object.keys(selectedAttributes).length) {
        setIsFiltered(true);
        const searchedFilteredProducts = await searchProducts(
          searchTextParameter,
          searchQuery,
          sortingField,
          sortingDirection,
          selectedAttributes
        );
        setFilteredProducts(searchedFilteredProducts);
      }
    };
  }, [searchTextParameter, searchQuery, sortingField, sortingDirection, selectedAttributes]);

  const onSearch = (searchFieldValue: string) => {
    setSearchQuery(searchFieldValue);
  };

  const onChangeSortingField = (sortingFieldValue: string) => {
    setSortingField(sortingFieldValue);
  };

  const onChangeSortingDirection = (sortingDirectionValue: string) => {
    setSortingDirection(sortingDirectionValue);
  };

  const onChangeSelectedAttribute = (newSelectedAttributes: SelectedAttributesList) => {
    setSelectedAttributes(newSelectedAttributes);
  };

  return (
    <Stack gap={3} px={3} height="100%">
      <Typography component="h2" variant="h2">
        Catalog
      </Typography>
      <Grid container spacing={3}>
        <Grid item sm={12} md={3} lg={2}>
          <Stack spacing={3}>
            <SearchField onSearch={onSearch} />
            <CatalogSorting
              sortingPriceParameter={sortingPriceParameter}
              sortingNameParameter={sortingNameParameter}
              onChangeSortingField={onChangeSortingField}
              onChangeSortingDirection={onChangeSortingDirection}
            />
            <AttributesFilter products={products} onChangeSelectedAttribute={onChangeSelectedAttribute} />
          </Stack>
        </Grid>
        <Grid item sm={12} md={9} lg={10}>
          <ContentLoaderWrapper loadingLogic={loadingLogic}>
            <Grid container spacing={3}>
              {(isFiltered ? filteredProducts : products).map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <CatalogProductItem product={product} />
                </Grid>
              ))}
            </Grid>
          </ContentLoaderWrapper>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default CatalogPage;
