import { render, screen } from '@testing-library/react';
import PromoCodeCard from './PromoCodeCard';

const discountCode = {
  id: 'id1',
  description: { 'en-US': 'Promo code for product1' },
  code: 'Promo-1',
};

describe('PromoCodeCard', () => {
  test('renders correctly', () => {
    render(<PromoCodeCard discountCode={discountCode} />);
    const card = screen.getByTestId('promo-code-card');
    expect(card).toBeInTheDocument();

    const description = screen.getByText(discountCode.description['en-US']);
    expect(description).toBeInTheDocument();

    const code = screen.getByText(discountCode.code);
    expect(code).toBeInTheDocument();
  });
});
