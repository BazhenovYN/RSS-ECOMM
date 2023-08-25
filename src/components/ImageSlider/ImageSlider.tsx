import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import type { Image } from 'types/types';

interface IProps {
  slides: Image[];
  isCover?: boolean;
  firstSlide?: number;
  onChange?: (value: number) => void;
}

function ImageSlider({ slides, onChange, isCover = false, firstSlide = 0 }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    if (firstSlide > 0 && firstSlide < slides.length) {
      return firstSlide;
    }
    return 0;
  });

  const goToPrevious = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    if (onChange) {
      onChange(newIndex);
    }
  };

  const goToNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    if (onChange) {
      onChange(newIndex);
    }
  };

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <IconButton
        size="large"
        onClick={goToPrevious}
        sx={{ position: 'absolute', top: '50%', left: '16px', transform: 'translate(0, -50%)', color: 'white' }}>
        <ArrowBackIosOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
      </IconButton>
      <IconButton
        size="large"
        onClick={goToNext}
        sx={{ position: 'absolute', top: '50%', right: '16px', transform: 'translate(0, -50%)', color: 'white' }}>
        <ArrowForwardIosOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
      </IconButton>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${slides[currentIndex]?.url})`,
          backgroundSize: isCover ? 'cover' : 'contain',
        }}
      />
    </Box>
  );
}

export default ImageSlider;
