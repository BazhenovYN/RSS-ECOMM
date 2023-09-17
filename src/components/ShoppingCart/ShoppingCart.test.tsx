import { DEFAULT_LANGUAGE } from 'constants/const';
import { render, screen } from '@testing-library/react';
import AppContext from 'context';
import { cart } from './mock';
import ShoppingCart from './ShoppingCart';

describe('ShoppingCart', () => {
  test('renders correctly', async () => {
    render(
      <AppContext.Provider
        value={{
          cart,
          setCart: jest.fn,
          isAuth: false,
          signInUser: () => Promise.resolve(true),
          signOutUser: () => Promise.resolve(true),
          setIsAuth: jest.fn,
          message: { text: null, severity: 'error' },
          setMessage: jest.fn,
          language: DEFAULT_LANGUAGE,
          wishList: undefined,
          setWishList: jest.fn,
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
