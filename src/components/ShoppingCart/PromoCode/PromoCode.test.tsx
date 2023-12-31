import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PromoCode from './PromoCode';

describe('PromoCode', () => {
  test('renders correctly', () => {
    render(<PromoCode onApply={jest.fn()} onReset={jest.fn()} />);

    const promo = screen.getByTestId('promoCode');
    expect(promo).toBeInTheDocument();

    const input = screen.getByLabelText('Promo code');
    expect(input).toBeInTheDocument();

    const applyButton = screen.getByRole('button');
    expect(applyButton).toBeInTheDocument();
  });

  test('promo code applied correctly', async () => {
    const onApply = jest.fn();
    render(<PromoCode onApply={onApply} onReset={jest.fn()} />);

    const input = screen.getByLabelText('Promo code');
    fireEvent.change(input, { target: { value: 'PROMO' } });

    const applyButton = screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(onApply).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(onApply).toBeCalledWith('PROMO');
    });
  });

  test('promo code reset correctly', async () => {
    const onReset = jest.fn();
    render(<PromoCode onApply={jest.fn()} onReset={onReset} code="PROMO" />);

    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });
});
