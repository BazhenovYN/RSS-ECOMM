import validationSchemes from 'constants/validationSchemes';
import { Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import CountrySelect from 'components/CountrySelect';
import { isPostCodeValid } from 'utils/utils';
import { AddressData, RegistrationFormAddress } from 'types/types';

interface IAddresses {
  shippingAddress: RegistrationFormAddress;
  billingAddress: RegistrationFormAddress;
  address: AddressData;
}

interface IProps {
  label: string;
  addressType: 'shippingAddress' | 'billingAddress' | 'address';
  disabled?: boolean;
}

// eslint-disable-next-line max-lines-per-function
function AddressFields({ label, addressType, disabled }: IProps) {
  const {
    register,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<IAddresses>();
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={control}
          name={`${addressType}.country`}
          rules={validationSchemes.country}
          render={({ field }) => (
            <CountrySelect
              disabled={disabled}
              value={field.value}
              isError={!!errors[addressType]?.country}
              errorMessage={errors[addressType]?.country?.message}
              onChange={field.onChange}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          control={control}
          name={`${addressType}.city`}
          rules={validationSchemes.city}
          render={({ field }) => (
            <TextField
              fullWidth
              label="City"
              disabled={disabled}
              value={field.value || ''}
              onChange={field.onChange}
              error={!!errors[addressType]?.city}
              helperText={errors[addressType]?.city?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          control={control}
          name={`${addressType}.postalCode`}
          rules={{
            ...validationSchemes.postalCode,
            validate: (value) => {
              const country = getValues(`${addressType}.country`);
              return isPostCodeValid(value, country) || `Invalid postal code`;
            },
          }}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Postal code"
              disabled={disabled}
              value={field.value || ''}
              onChange={field.onChange}
              error={!!errors[addressType]?.postalCode}
              helperText={errors[addressType]?.postalCode?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={control}
          name={`${addressType}.street`}
          rules={validationSchemes.street}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Street"
              disabled={disabled}
              value={field.value || ''}
              onChange={field.onChange}
              error={!!errors[addressType]?.street}
              helperText={errors[addressType]?.street?.message}
            />
          )}
        />
      </Grid>
      {(addressType === 'shippingAddress' || addressType === 'billingAddress') && (
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Set as default address"
            {...register(`${addressType}.isDefault`)}
          />
        </Grid>
      )}
      {addressType === 'address' && (
        <>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name={`${addressType}.isBilling`}
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, ref, ...field } }) => (
                    <Checkbox {...field} inputRef={ref} checked={!!value} color="primary" />
                  )}
                />
              }
              label="Set as billing address"
            />
            <FormControlLabel
              control={
                <Controller
                  name={`${addressType}.isShipping`}
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, ref, ...field } }) => (
                    <Checkbox {...field} inputRef={ref} checked={!!value} color="primary" />
                  )}
                />
              }
              label="Set as shipping address"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Controller
                  name={`${addressType}.isDefaultBilling`}
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, ref, ...field } }) => (
                    <Checkbox {...field} inputRef={ref} checked={!!value} color="primary" />
                  )}
                />
              }
              label="Set as default billing address"
            />
            <FormControlLabel
              control={
                <Controller
                  name={`${addressType}.isDefaultShipping`}
                  control={control}
                  defaultValue={false}
                  render={({ field: { value, ref, ...field } }) => (
                    <Checkbox {...field} inputRef={ref} checked={!!value} color="primary" />
                  )}
                />
              }
              label="Set as default shipping address"
            />
          </Grid>
        </>
      )}
    </>
  );
}

export default AddressFields;
