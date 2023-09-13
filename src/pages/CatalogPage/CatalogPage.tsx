import { DEFAULT_LANGUAGE } from 'constants/const';
import sortingDirections from 'constants/sortingDirections';
import { Grid, Pagination, Stack, Typography, useMediaQuery } from '@mui/material';
import { getAttributes, searchProducts } from 'services/sdk/product';
import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
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
import { Cart } from '@commercetools/platform-sdk';

function CatalogPage() {
  const appContext = useContext(AppContext);
  const language = appContext?.language;
  const isAuth = appContext?.isAuth;
  const { categoryId } = useParams();
  const sortingNameParameter = useMemo(() => `name.${language || DEFAULT_LANGUAGE}`, [language]);
  const sortingPriceParameter = 'price';
  const searchTextParameter = useMemo(() => `text.${language || DEFAULT_LANGUAGE}`, [language]);

  const [sortingField, setSortingField] = useState(sortingNameParameter);
  const [sortingDirection, setSortingDirection] = useState(sortingDirections.ASC);
  const [searchQuery, setSearchQuery] = useState('');
  const [attributes, setAttributes] = useState<AttributesList>({});
  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributesList>({});
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoriesList>({ mains: [], subs: [] });
  const [waitForCartUpdate, setWaitForCartUpdate] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [productsPerPage, setProductsPerPage] = useState(8);
  const [pagesCount, setPagesCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const isXs = useMediaQuery('(max-width:599px)');
  const isSm = useMediaQuery('(max-width:1199px)');
  const isLg = useMediaQuery('(max-width:1535px)');

  useEffect(() => {
    if (isXs) {
      setProductsPerPage(2);
    } else if (isSm) {
      setProductsPerPage(4);
    } else if (isLg) {
      setProductsPerPage(6);
    } else {
      setProductsPerPage(8);
    }
  }, [isXs, isSm, isLg]);

  useEffect(() => {
    setCurrentPage(1);
  }, [isXs, isSm, isLg, searchQuery, categoryId, selectedAttributes]);

  const loadingProducts = useMemo(() => {
    return async () => {
      const searchParams: SearchParams = {
        searchTextParameter,
        searchQuery,
        sortingField,
        sortingDirection,
        categoryId,
      };

      const allProducts = await searchProducts(searchParams);
      setAttributes(getAttributes(allProducts.products));

      setCart(await getActiveCart(isAuth));

      const searchedFilteredProducts = await searchProducts({
        ...searchParams,
        selectedAttributes,
        limit: productsPerPage,
        offset: (currentPage - 1) * productsPerPage,
      });
      setDisplayedProducts(searchedFilteredProducts.products);
      setPagesCount(Math.ceil(searchedFilteredProducts.total / productsPerPage) || 1);
    };
  }, [
    searchTextParameter,
    searchQuery,
    sortingField,
    sortingDirection,
    selectedAttributes,
    categoryId,
    isAuth,
    currentPage,
    productsPerPage,
  ]);

  const loadingCategories = useMemo(() => {
    return async () => {
      setCategories(await getCategories());
    };
  }, []);

  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

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
              {displayedProducts.map((product) => (
                <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
                  <CatalogProductItem product={product} setWaitForCartUpdate={setWaitForCartUpdate} cart={cart} />
                </Grid>
              ))}
            </Grid>
            {pagesCount !== 1 && (
              <Pagination
                count={pagesCount}
                color="primary"
                onChange={handleChangePage}
                sx={{ marginTop: 3 }}
                page={currentPage}
              />
            )}
          </ContentLoaderWrapper>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default CatalogPage;
