import { Box, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface IProps {
  count: number;
  setCount: (value: number) => void;
  disabled?: boolean;
}

function Counter({ count, setCount, disabled }: IProps) {
  return (
    <Stack data-testid="counter" direction="row" alignItems="center" spacing={1}>
      <IconButton data-testid="decrement" disabled={disabled} onClick={() => (count > 1 ? setCount(count - 1) : null)}>
        <RemoveIcon />
      </IconButton>
      <Box
        component="span"
        minWidth={20}
        textAlign="center"
        sx={{
          cursor: 'default',
          color: disabled ? 'text.disabled' : 'text.primary',
        }}>
        {count}
      </Box>
      <IconButton data-testid="increment" disabled={disabled} onClick={() => setCount(count + 1)}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
}

export default Counter;
