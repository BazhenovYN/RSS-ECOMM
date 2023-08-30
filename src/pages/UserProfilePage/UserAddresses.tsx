import { Button, Dialog, Grid, Stack } from '@mui/material';
import type { Address, Customer } from '@commercetools/platform-sdk';
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { AddressData } from 'types/types';
import AddressCard from 'components/AddressCard';
import AddressFields from 'components/AddressFields';
import { FormProvider, useForm } from 'react-hook-form';
import { addAddress, editAddress } from 'services/sdk/customer';
import AppContext from 'context';

interface UserAddressesProps {
  user: Customer | undefined;
  setUser: Dispatch<SetStateAction<Customer | undefined>>;
}

interface AddressFormData {
  address: AddressData;
}

type FormSubmitAction = (address: AddressData, version: number) => Promise<Customer | undefined>;

const defaultAddress: AddressData = {
  street: '',
  city: '',
  postalCode: '',
  country: '',
  isShipping: false,
  isBilling: false,
  isDefaultBilling: false,
  isDefaultShipping: false,
};

const defaultFormValues: AddressFormData = {
  address: defaultAddress,
};

// eslint-disable-next-line max-lines-per-function
function UserAddresses({ user, setUser }: UserAddressesProps) {
  const addressesData = useMemo(() => {
    const addresses: Address[] = user?.addresses || [];
    const billingAddressIds: string[] = user?.billingAddressIds || [];
    const defaultBillingAddressId: string | undefined = user?.defaultBillingAddressId;
    const shippingAddressIds: string[] = user?.shippingAddressIds || [];
    const defaultShippingAddressId: string | undefined = user?.defaultShippingAddressId;

    return addresses.map((address): AddressData => {
      const { id } = address;
      const isBilling = id ? billingAddressIds.includes(id) : false;
      const isShipping = id ? shippingAddressIds.includes(id) : false;
      const isDefaultBilling = id ? defaultBillingAddressId === id : false;
      const isDefaultShipping = id ? defaultShippingAddressId === id : false;

      return {
        id,
        country: address.country,
        city: address.city || '',
        postalCode: address.postalCode || '',
        street: address.streetName || '',
        isBilling,
        isBillingBefore: isBilling,
        isShipping,
        isShippingBefore: isShipping,
        isDefaultBilling,
        isDefaultBillingBefore: isDefaultBilling,
        isDefaultShipping,
        isDefaultShippingBefore: isDefaultShipping,
      };
    });
  }, [user]);

  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;

  const methods = useForm<AddressFormData>({ defaultValues: defaultFormValues, mode: 'all' });
  const { handleSubmit, setValue } = methods;
  const [formOpen, setFormOpen] = useState(false);
  const [formLabel, setFormLabel] = useState('');
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const [formAction, setFormAction] = useState<FormSubmitAction>(() => addAddress);
  const [redactedAddress, setRedactedAddress] = useState<AddressData>(defaultAddress);

  useEffect(() => {
    setValue('address', redactedAddress);
  }, [redactedAddress, setValue]);

  const handleNewAddressFormOpen = () => {
    setFormLabel('Add new address');
    setFormSuccessMessage('The address was successfully added');
    setFormAction(() => addAddress);
    setFormOpen(true);
  };

  const handleEditAddressFormOpen = () => {
    setFormLabel('Edit address');
    setFormSuccessMessage('The address was successfully updated');
    setFormAction(() => editAddress);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setRedactedAddress(defaultAddress);
    setValue('address', defaultAddress);
  };

  const handleFormSubmit = async (addressFormData: AddressFormData) => {
    if (!user?.version) {
      if (setMessage) setMessage({ severity: 'error', text: 'User data not found' });
      return;
    }
    try {
      const updatedUser = await formAction(addressFormData.address, user.version);
      if (setMessage) setMessage({ severity: 'success', text: formSuccessMessage });
      handleFormClose();
      setUser(updatedUser);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  return (
    <Stack gap={3} alignItems="flex-start">
      <Grid container spacing={3}>
        {addressesData.map((address) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={address.id}>
            <AddressCard
              address={address}
              setUser={setUser}
              userVersion={user?.version}
              setRedactedAddress={setRedactedAddress}
              handleEdit={handleEditAddressFormOpen}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleNewAddressFormOpen}>
        Add address
      </Button>
      <Dialog open={formOpen} onClose={handleFormClose}>
        <FormProvider {...methods}>
          <Grid container component="form" spacing={2} onSubmit={handleSubmit(handleFormSubmit)} padding={3}>
            <AddressFields label={formLabel} addressType="address" />
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                {formLabel}
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </Dialog>
    </Stack>
  );
}

export default UserAddresses;
