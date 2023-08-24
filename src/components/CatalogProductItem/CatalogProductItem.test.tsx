import { render, screen } from '@testing-library/react';
import CatalogProductItem from 'components/CatalogProductItem';
import AppContext, { IAppContext } from 'context';
import { ProductProjection } from '@commercetools/platform-sdk';
import logo from 'assets/img/logo.png';

const product: Pick<ProductProjection, 'id' | 'masterVariant' | 'name' | 'description'> = {
  name: {
    'en-US': 'Product name',
    ru: 'Имя продукта',
  },
  description: {
    'en-US': 'Product description',
    ru: 'Описание продукта',
  },
  masterVariant: {
    images: [
      {
        url: 'test-img-url',
        dimensions: { w: 1500, h: 1000 },
      },
    ],
    id: 1,
  },
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
  language: 'en-US',
};

describe('CatalogProductItem', () => {
  test('renders correctly', () => {
    render(
      <AppContext.Provider value={appContext}>
        <CatalogProductItem product={product} />
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
        <CatalogProductItem product={product} />
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
        <CatalogProductItem
          product={{
            ...product,
            masterVariant: {
              id: 1,
            },
          }}
        />
      </AppContext.Provider>
    );

    const productImg = screen.getByRole('img');
    expect(productImg).toHaveAttribute('src', logo);
  });
});
