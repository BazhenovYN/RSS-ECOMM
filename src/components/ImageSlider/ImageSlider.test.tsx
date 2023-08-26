import { fireEvent, render, screen } from '@testing-library/react';
import type { Image } from 'types/types';
import ImageSlider from './ImageSlider';

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

describe('ImageSlider', () => {
  test('renders correctly', () => {
    render(<ImageSlider slides={slides} currentSlide={0} onChange={jest.fn()} />);
    const slide = screen.getByTestId('slide');
    expect(slide).toBeInTheDocument();
  });

  test('change slide forward correctly', () => {
    const onChange = jest.fn();
    const currentSlide = 0;
    const newSlide = 1;

    render(<ImageSlider slides={slides} currentSlide={currentSlide} onChange={onChange} />);
    const nextButton = screen.getByTestId('goToNext');
    fireEvent.click(nextButton);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith(newSlide);
  });

  test('change slide backward correctly', () => {
    const onChange = jest.fn();
    const currentSlide = 2;
    const newSlide = 1;

    render(<ImageSlider slides={slides} currentSlide={currentSlide} onChange={onChange} />);
    const prevButton = screen.getByTestId('goToPrevious');
    fireEvent.click(prevButton);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith(newSlide);
  });

  test('slide looped correctly', () => {
    const onChange = jest.fn();
    const currentSlide = 0;
    const newSlide = 2;

    render(<ImageSlider slides={slides} currentSlide={currentSlide} onChange={onChange} />);
    const prevButton = screen.getByTestId('goToPrevious');
    fireEvent.click(prevButton);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith(newSlide);
  });
});
