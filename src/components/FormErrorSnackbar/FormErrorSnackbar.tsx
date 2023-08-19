import { Snackbar, Alert } from '@mui/material';

interface FormErrorSnackbarProps {
  error: string | null;
  onClose: () => void;
}

function FormErrorSnackbar({ error, onClose }: FormErrorSnackbarProps) {
  return (
    <Snackbar open={!!error} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}

export default FormErrorSnackbar;
