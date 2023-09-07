import { DEFAULT_LANGUAGE } from 'constants/const';
import sortingDirections from 'constants/sortingDirections';
import { Grid, Stack, Typography } from '@mui/material';
import { getAttributes, searchProducts } from 'services/sdk/product';
import { useContext, useMemo, useState } from 'react';
import CatalogProductItem from 'components/CatalogProductItem';
import { AttributesList, CategoriesList, Product, SearchParams, SelectedAttributesList } from 'types/types';
import ContentLoaderWrapper from 'components/ContentLoaderWrapper';
import AppContext from 'context';
import CatalogSorting from 'components/CatalogSorting';
import SearchField from 'components/SearchField';
import AttributesFilter from 'components/AttributesFilter';
import CategoriesListing from 'components/CategoriesListing';
import { useParams } from 'react-router-dom';
import { getCategories } from 'services/sdk/category';
import BreadcrumbNavigation from 'components/BreadcrumbNavigation';
import Loader from 'components/Loader';
import { getActiveCart } from 'services/sdk/cart';
import { LineItem } from '@commercetools/platform-sdk';

function CatalogPage() {
  const appContext = useContext(AppContext);
  const language = appContext?.language;
  const isAuth = appContext?.isAuth;
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
  const [waitForCartUpdate, setWaitForCartUpdate] = useState(false);
  const [cartItems, setCartItems] = useState<LineItem[]>([]);

  const loadingProducts = useMemo(() => {
    return async () => {
      const searchParams: SearchParams = {
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

      setCartItems((await getActiveCart(isAuth)).lineItems);

      if (Object.keys(selectedAttributes).length) {
        setIsFiltered(true);
        const searchedFilteredProducts = await searchProducts({
          ...searchParams,
          selectedAttributes,
        });
        setFilteredProducts(searchedFilteredProducts);
      }
    };
  }, [searchTextParameter, searchQuery, sortingField, sortingDirection, selectedAttributes, categoryId, isAuth]);

  const loadingCategories = useMemo(() => {
    return async () => {
      setCategories(await getCategories());
    };
  }, []);

  return (
    <Stack gap={3} height="100%">
      {waitForCartUpdate && <Loader transparent />}
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
            <BreadcrumbNavigation categories={categories} categoryId={categoryId} language={language} />
            <Grid container spacing={3}>
              {(isFiltered ? filteredProducts : products).map((product) => (
                <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
                  <CatalogProductItem
                    product={product}
                    setWaitForCartUpdate={setWaitForCartUpdate}
                    cartItems={cartItems}
                  />
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
