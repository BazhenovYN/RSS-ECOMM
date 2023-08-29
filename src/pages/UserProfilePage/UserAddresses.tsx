import { Box } from '@mui/material';
import type { Customer } from '@commercetools/platform-sdk';

interface IProps {
  user: Customer | undefined;
}

function UserAddresses({ user }: IProps) {
  console.log(user);
  return <Box>Addresses</Box>;
}

export default UserAddresses;
