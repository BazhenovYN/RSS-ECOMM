import { Snackbar, Alert } from '@mui/material';

interface SuccessSnackbarProps {
  message: string | null;
  onClose: () => void;
}

function SuccessSnackbar({ message, onClose }: SuccessSnackbarProps) {
  return (
    <Snackbar open={!!message} onClose={onClose}>
      <Alert onClose={onClose} severity="success">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SuccessSnackbar;
