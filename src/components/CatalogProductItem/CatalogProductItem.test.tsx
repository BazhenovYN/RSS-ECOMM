import { DEFAULT_LANGUAGE } from 'constants/const';
import { render, screen } from '@testing-library/react';
import CatalogProductItem from 'components/CatalogProductItem';
import AppContext, { IAppContext } from 'context';
import logo from 'assets/img/logo.png';
import { Product } from 'types/types';
import { BrowserRouter } from 'react-router-dom';

const product: Product = {
  name: {
    'en-US': 'Product name',
    ru: 'Имя продукта',
  },
  description: {
    'en-US': 'Product description',
    ru: 'Описание продукта',
  },
  images: [
    {
      url: 'test-img-url',
      dimensions: { w: 1, h: 1 },
    },
  ],
  id: 'test-id',
};

const appContext: IAppContext = {
  isAuth: false,
  setIsAuth: () => {},
  message: {
    text: null,
    severity: undefined,
  },
  setMessage: () => {},
  language: DEFAULT_LANGUAGE,
};

describe('CatalogProductItem', () => {
  test('renders correctly', () => {
    render(
      <AppContext.Provider value={appContext}>
        <BrowserRouter>
          <CatalogProductItem product={product} />
        </BrowserRouter>
      </AppContext.Provider>
    );

    const productName = screen.getByText('Product name');
    expect(productName).toBeInTheDocument();

    const productDescription = screen.getByText('Product description');
    expect(productDescription).toBeInTheDocument();

    const productImg = screen.getByRole('img');
    expect(productImg).toHaveAttribute('src', 'test-img-url');
  });

  test('renders correctly with another language', () => {
    render(
      <AppContext.Provider value={{ ...appContext, language: 'ru' }}>
        <BrowserRouter>
          <CatalogProductItem product={product} />
        </BrowserRouter>
      </AppContext.Provider>
    );

    const productName = screen.getByText('Имя продукта');
    expect(productName).toBeInTheDocument();

    const productDescription = screen.getByText('Описание продукта');
    expect(productDescription).toBeInTheDocument();
  });

  test('renders correctly without img', () => {
    render(
      <AppContext.Provider value={appContext}>
        <BrowserRouter>
          <CatalogProductItem
            product={{
              ...product,
              images: undefined,
            }}
          />
        </BrowserRouter>
      </AppContext.Provider>
    );

    const productImg = screen.getByRole('img');
    expect(productImg).toHaveAttribute('src', logo);
  });
});
