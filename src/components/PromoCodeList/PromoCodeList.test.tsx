import { render, screen } from '@testing-library/react';
import PromoCodeList from './PromoCodeList';

const discountCodes = [
  {
    id: 'id1',
    description: { 'en-US': 'Promo code for product1' },
    code: 'Promo-1',
  },
  {
    id: 'id2',
    description: { 'en-US': 'Promo code for product2' },
    code: 'Promo-2',
  },
];

jest.mock('services/sdk/cart', () => ({
  __esModule: true,
  ...jest.requireActual('services/sdk/cart'),
  getDiscountCodes: () => Promise.resolve(discountCodes),
}));

describe('PromoCodeList', () => {
  test('renders correctly', async () => {
    render(<PromoCodeList />);
    const promoCodeList = await screen.findByTestId('promo-code-list');
    expect(promoCodeList).toBeInTheDocument();
  });

  test('card count is correct', async () => {
    render(<PromoCodeList />);
    const cards = await screen.findAllByTestId('promo-code-card');
    expect(cards).toHaveLength(discountCodes.length);
  });
});
