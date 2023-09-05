import { fireEvent, render, screen } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  test('renders correctly', () => {
    render(<Counter count={1} setCount={jest.fn()} />);
    const counter = screen.getByTestId('counter');
    expect(counter).toBeInTheDocument();
  });

  test('increment correctly', () => {
    const setCount = jest.fn();
    const currentValue = 1;
    const newValue = 2;

    render(<Counter count={currentValue} setCount={setCount} />);
    const incrementButton = screen.getByTestId('increment');
    fireEvent.click(incrementButton);
    expect(setCount).toHaveBeenCalledTimes(1);
    expect(setCount).toBeCalledWith(newValue);
  });

  test('decrement correctly', () => {
    const setCount = jest.fn();
    const currentValue = 3;
    const newValue = 2;

    render(<Counter count={currentValue} setCount={setCount} />);
    const decrementButton = screen.getByTestId('decrement');
    fireEvent.click(decrementButton);
    expect(setCount).toHaveBeenCalledTimes(1);
    expect(setCount).toBeCalledWith(newValue);
  });

  test('min count value correctly', () => {
    const setCount = jest.fn();
    render(<Counter count={1} setCount={setCount} />);
    const decrementButton = screen.getByTestId('decrement');
    fireEvent.click(decrementButton);
    expect(setCount).toHaveBeenCalledTimes(0);
  });
});
