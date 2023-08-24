import { useState } from 'react';
import classNames from 'classnames/bind';
import type { Image } from 'types/types';

import styles from './ImageSlider.module.scss';

interface IProps {
  slides: Image[];
}

function ImageSlider({ slides }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cn = classNames.bind(styles);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={cn('slider')}>
      <button type="button" className={cn('arrow', 'left-arrow')} onClick={goToPrevious}>
        &#10094;
      </button>
      <button type="button" className={cn('arrow', 'right-arrow')} onClick={goToNext}>
        &#10095;
      </button>
      <div className={cn('slide')} style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }} />
    </div>
  );
}

export default ImageSlider;
