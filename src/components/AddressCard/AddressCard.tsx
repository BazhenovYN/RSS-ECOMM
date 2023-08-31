import countries from 'constants/countries';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { AddressData } from 'types/types';
import { deleteAddress } from 'services/sdk/customer';
import { Dispatch, SetStateAction, useContext } from 'react';
import AppContext from 'context';
import { Customer } from '@commercetools/platform-sdk';

interface AddressCardProps {
  address: AddressData;
  userVersion: number | undefined;
  setUser: Dispatch<SetStateAction<Customer | undefined>>;
  setRedactedAddress: Dispatch<SetStateAction<AddressData>>;
  handleEdit: () => void;
}

function AddressCard({ address, userVersion, setUser, setRedactedAddress, handleEdit }: AddressCardProps) {
  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;

  const onDeleteClick = async () => {
    if (!userVersion) {
      if (setMessage) setMessage({ severity: 'error', text: 'User data not found' });
      return;
    }
    try {
      const updatedUser = await deleteAddress(address, userVersion);
      if (setMessage) setMessage({ severity: 'success', text: 'The address was successfully deleted' });
      setUser(updatedUser);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const onEditClick = () => {
    setRedactedAddress(address);
    handleEdit();
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {address.id &&
        (address.isBilling || address.isShipping || address.isDefaultBilling || address.isDefaultShipping) && (
          <CardContent>
            <Typography>Address types:</Typography>
            {address.isBilling && <Typography>Billing</Typography>}
            {address.isShipping && <Typography>Shipping</Typography>}
            {address.isDefaultBilling && <Typography>Default Billing</Typography>}
            {address.isDefaultShipping && <Typography>Default Shipping</Typography>}
          </CardContent>
        )}
      <CardContent>
        <Typography>Country: {countries.find((value) => value.code === address.country)?.label}</Typography>
        {address.city && <Typography>City: {address.city}</Typography>}
        {address.postalCode && <Typography>Postal Code: {address.postalCode}</Typography>}
        {address.street && <Typography>Street: {address.street}</Typography>}
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button variant="contained" color="primary" onClick={onEditClick}>
          Edit
        </Button>
        <Button variant="contained" color="primary" onClick={onDeleteClick}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default AddressCard;
