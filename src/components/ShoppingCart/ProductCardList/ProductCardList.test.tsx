import { render, screen } from '@testing-library/react';
import ProductCardList from './ProductCardList';
import { cart } from '../mock';

const setProductQuantity = jest.fn();
const removeProduct = jest.fn();
const currency = 'EUR';
const language = 'en-US';

describe('ProductCardList', () => {
  test('renders correctly', () => {
    render(
      <ProductCardList
        cart={cart}
        currency={currency}
        language={language}
        setProductQuantity={setProductQuantity}
        removeProduct={removeProduct}
      />
    );
    const cardList = screen.getByTestId('product-card-list');
    expect(cardList).toBeInTheDocument();
  });

  test('card count is correct', () => {
    render(
      <ProductCardList
        cart={cart}
        currency={currency}
        language={language}
        setProductQuantity={setProductQuantity}
        removeProduct={removeProduct}
      />
    );
    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(cart.lineItems.length);
  });
});
