import countries from 'constants/countries';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Customer } from '@commercetools/platform-sdk';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { grey, lightBlue } from '@mui/material/colors';
import AppContext from 'context';
import { deleteAddress } from 'services/sdk/customer';
import { AddressData } from 'types/types';

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

  const styles = {
    primaryLabel: {
      backgroundColor: grey[300],
      borderRadius: '16px',
      padding: '0 8px',
      margin: '4px 0',
      width: 'max-content',
    },
    secondaryLabel: {
      backgroundColor: lightBlue[50],
      borderRadius: '16px',
      padding: '0 8px',
      margin: '4px 0',
      width: 'max-content',
    },
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {address.id &&
        (address.isBilling || address.isShipping || address.isDefaultBilling || address.isDefaultShipping) && (
          <CardContent>
            <Typography>Address types:</Typography>
            {address.isBilling && <Typography sx={styles.primaryLabel}>Billing</Typography>}
            {address.isShipping && <Typography sx={styles.primaryLabel}>Shipping</Typography>}
            {address.isDefaultBilling && <Typography sx={styles.secondaryLabel}>Default Billing</Typography>}
            {address.isDefaultShipping && <Typography sx={styles.secondaryLabel}>Default Shipping</Typography>}
          </CardContent>
        )}
      <CardContent>
        <Typography>Country: {countries.find((value) => value.code === address.country)?.label}</Typography>
        {address.city && <Typography>City: {address.city}</Typography>}
        {address.postalCode && <Typography>Postal Code: {address.postalCode}</Typography>}
        {address.street && <Typography>Street: {address.street}</Typography>}
      </CardContent>
      <CardActions sx={{ marginTop: 'auto', padding: '16px' }}>
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
