import { DEFAULT_LANGUAGE } from 'constants/const';
import sortingDirections from 'constants/sortingDirections';
import { Grid, Stack, Typography } from '@mui/material';
import { getAttributes, searchProducts } from 'services/sdk/product';
import { useContext, useMemo, useState } from 'react';
import CatalogProductItem from 'components/CatalogProductItem';
import { AttributesList, CategoriesList, Product, SelectedAttributesList } from 'types/types';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import AppContext from 'context';
import CatalogSorting from 'components/CatalogSorting';
import SearchField from 'components/SearchField';
import AttributesFilter from 'components/AttributesFilter';
import CategoriesListing from 'components/CategoriesListing';
import { useParams } from 'react-router-dom';
import { getCategories } from 'services/sdk/category';

function CatalogPage() {
  const appContext = useContext(AppContext);
  const language = appContext?.language;
  const { categoryId } = useParams();
  const sortingNameParameter = useMemo(() => `name.${language || DEFAULT_LANGUAGE}`, [language]);
  const sortingPriceParameter = 'price';
  const searchTextParameter = useMemo(() => `text.${language || DEFAULT_LANGUAGE}`, [language]);

  const [products, setProducts] = useState<Product[]>([]);
  const [sortingField, setSortingField] = useState(sortingNameParameter);
  const [sortingDirection, setSortingDirection] = useState(sortingDirections.ASC);
  const [searchQuery, setSearchQuery] = useState('');
  const [attributes, setAttributes] = useState<AttributesList>({});
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributesList>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [categories, setCategories] = useState<CategoriesList>({ mains: [], subs: [] });

  const loadingProducts = useMemo(() => {
    return async () => {
      const searchParams = {
        searchTextParameter,
        searchQuery,
        sortingField,
        sortingDirection,
        categoryId,
      };

      setIsFiltered(false);
      const searchedProducts = await searchProducts(searchParams);
      setProducts(searchedProducts);
      setAttributes(getAttributes(searchedProducts));

      if (Object.keys(selectedAttributes).length) {
        setIsFiltered(true);
        const searchedFilteredProducts = await searchProducts({
          ...searchParams,
          selectedAttributes,
        });
        setFilteredProducts(searchedFilteredProducts);
      }
    };
  }, [searchTextParameter, searchQuery, sortingField, sortingDirection, selectedAttributes, categoryId]);

  const loadingCategories = useMemo(() => {
    return async () => {
      setCategories(await getCategories());
    };
  }, []);

  return (
    <Stack gap={3} height="100%">
      <Typography component="h2" variant="h2">
        Catalog
      </Typography>
      <Grid container spacing={3} height="100%">
        <Grid item xs={12} sm={12} md={3} lg={2}>
          <Stack spacing={3}>
            <SearchField data-testid="catalog-search" onSearch={setSearchQuery} />
            <ContentLoaderWrapper loadingLogic={loadingCategories}>
              <CategoriesListing
                language={language || DEFAULT_LANGUAGE}
                categories={categories}
                currentCategoryID={categoryId}
              />
            </ContentLoaderWrapper>
            <CatalogSorting
              sortingPriceParameter={sortingPriceParameter}
              sortingNameParameter={sortingNameParameter}
              onChangeSortingField={setSortingField}
              onChangeSortingDirection={setSortingDirection}
            />
            <AttributesFilter attributes={attributes} onChangeSelectedAttribute={setSelectedAttributes} />
          </Stack>
        </Grid>
        <Grid item sm={12} md={9} lg={10}>
          <ContentLoaderWrapper loadingLogic={loadingProducts}>
            <Grid container spacing={3}>
              {(isFiltered ? filteredProducts : products).map((product) => (
                <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
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
