import { Box, IconButton } from '@mui/material';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import type { Image } from 'types/types';

interface IProps {
  slides: Image[];
  isFullScreenMode?: boolean;
  currentSlide: number;
  onChange: (value: number) => void;
}

function ImageSlider({ slides, onChange, isFullScreenMode = false, currentSlide }: IProps) {
  const goToPrevious = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    if (onChange) {
      onChange(newIndex);
    }
  };

  const goToNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    const isLastSlide = currentSlide === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    if (onChange) {
      onChange(newIndex);
    }
  };

  return (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <IconButton
        data-testid="goToPrevious"
        size="large"
        onClick={goToPrevious}
        sx={{ position: 'absolute', top: '50%', left: '16px', transform: 'translate(0, -50%)', color: 'white' }}>
        <ArrowBackIosOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
      </IconButton>
      <IconButton
        data-testid="goToNext"
        size="large"
        onClick={goToNext}
        sx={{ position: 'absolute', top: '50%', right: '16px', transform: 'translate(0, -50%)', color: 'white' }}>
        <ArrowForwardIosOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
      </IconButton>
      <Box
        data-testid="slide"
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${slides[currentSlide]?.url})`,
          backgroundSize: isFullScreenMode ? 'contain' : 'cover',
          borderRadius: isFullScreenMode ? 0 : '4px',
        }}
      />
    </Box>
  );
}

export default ImageSlider;
