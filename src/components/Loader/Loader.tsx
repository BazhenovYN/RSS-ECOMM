import { Box, CircularProgress } from '@mui/material';
import styles from 'components/Loader/Loader.module.scss';

interface LoaderProps {
  transparent?: boolean;
}

function Loader({ transparent }: LoaderProps) {
  return (
    <Box className={`${styles.loader} ${transparent ? styles.transparent : ''}`}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;
