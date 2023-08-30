import { Box, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface IProps {
  count: number;
  setCount: (value: number) => void;
}

function Counter({ count, setCount }: IProps) {
  return (
    <Stack data-testid="counter" direction="row" alignItems="center" spacing={1}>
      <IconButton data-testid="decrement" onClick={() => (count > 1 ? setCount(count - 1) : null)}>
        <RemoveIcon />
      </IconButton>
      <Box component="span" minWidth={20} textAlign="center">
        {count}
      </Box>
      <IconButton data-testid="increment" onClick={() => setCount(count + 1)}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
}

export default Counter;
