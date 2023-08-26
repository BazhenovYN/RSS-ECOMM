import { fireEvent, render, screen } from '@testing-library/react';
import type { Image } from 'types/types';
import FullScreenImageSlider from './FullScreenImageSlider';

const slides: Image[] = [
  {
    url: '',
  },
  {
    url: '',
  },
  {
    url: '',
  },
];

describe('FullScreenImageSlider', () => {
  test('renders correctly', () => {
    render(<FullScreenImageSlider slides={slides} open currentSlide={0} onClose={jest.fn()} onChange={jest.fn()} />);
    const modal = screen.getByRole('presentation');
    expect(modal).toBeInTheDocument();
  });

  test('no renders without open-flag', () => {
    render(
      <FullScreenImageSlider slides={slides} open={false} currentSlide={0} onClose={jest.fn()} onChange={jest.fn()} />
    );
    const modal = screen.queryByRole('presentation');
    expect(modal).not.toBeInTheDocument();
  });

  test('close correctly', () => {
    const onClose = jest.fn();
    render(<FullScreenImageSlider slides={slides} open currentSlide={0} onClose={onClose} onChange={jest.fn()} />);
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
