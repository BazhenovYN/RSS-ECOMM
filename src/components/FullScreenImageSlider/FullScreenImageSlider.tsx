import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageSlider from 'components/ImageSlider';
import type { Image } from 'types/types';

interface IProps {
  slides: Image[];
  open: boolean;
  onClose: () => void;
}

function FullScreenImageSlider({ slides, open, onClose }: IProps) {
  return (
    <Modal open={open} onClose={onClose} disableAutoFocus>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <ImageSlider slides={slides} />
        <IconButton
          onClick={onClose}
          size="large"
          sx={{ position: 'absolute', top: '16px', right: '16px', color: 'white' }}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Box>
    </Modal>
  );
}

export default FullScreenImageSlider;
