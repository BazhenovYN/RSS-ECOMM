import { Snackbar, Alert, AlertColor } from '@mui/material';

interface PopupMessageProps {
  text: string | null;
  severity: AlertColor | undefined;
  onClose: () => void;
}

function PopupMessage({ text, onClose, severity }: PopupMessageProps) {
  return (
    <Snackbar autoHideDuration={5000} open={!!text} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  );
}

export default PopupMessage;
