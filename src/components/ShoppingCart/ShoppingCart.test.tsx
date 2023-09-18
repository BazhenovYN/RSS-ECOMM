import { DEFAULT_LANGUAGE } from 'constants/const';
import { render, screen } from '@testing-library/react';
import AppContext from 'context';
import { cart } from './mock';
import ShoppingCart from './ShoppingCart';

const discountCode = {
  code: 'PROMO',
};

jest.mock('services/sdk/cart', () => ({
  __esModule: true,
  ...jest.requireActual('services/sdk/cart'),
  getDiscountCode: () => Promise.resolve(discountCode),
}));

describe('ShoppingCart', () => {
  test('renders correctly', async () => {
    render(
      <AppContext.Provider
        value={{
          cart,
          setCart: jest.fn,
          isAuth: false,
          setIsAuth: jest.fn,
          signInUser: jest.fn().mockResolvedValue(true),
          signOutUser: jest.fn,
          message: { text: null, severity: 'error' },
          setMessage: jest.fn,
          language: DEFAULT_LANGUAGE,
          wishList: undefined,
          setWishList: jest.fn,
          user: undefined,
          setUser: jest.fn,
        }}>
        <ShoppingCart />
      </AppContext.Provider>
    );
    const totalColumn = await screen.findByRole('heading', { level: 6 });
    expect(totalColumn).toBeInTheDocument();

    const clearButton = await screen.findByRole('button', { name: 'Clear Shopping Cart' });
    expect(clearButton).toBeInTheDocument();
  });
});
