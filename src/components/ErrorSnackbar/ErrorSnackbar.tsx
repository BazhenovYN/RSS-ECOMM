import { Snackbar, Alert } from '@mui/material';

interface ErrorSnackbarProps {
  error: string | null;
  onClose: () => void;
}

function ErrorSnackbar({ error, onClose }: ErrorSnackbarProps) {
  return (
    <Snackbar open={!!error} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackbar;
