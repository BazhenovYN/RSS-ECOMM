import validationSchemes from 'constants/validationSchemes';
import { Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface IAddresses {
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  };
  billingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  };
}

interface IProps {
  label: string;
  addressType: 'shippingAddress' | 'billingAddress';
}

function AddressFields({ label, addressType }: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<IAddresses>();
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Country"
          {...register(`${addressType}.country`, validationSchemes.country)}
          error={!!errors[addressType]?.country}
          helperText={errors[addressType]?.country?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="City"
          {...register(`${addressType}.city`, validationSchemes.city)}
          error={!!errors[addressType]?.city}
          helperText={errors[addressType]?.city?.message}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Postal code"
          {...register(`${addressType}.postalCode`, validationSchemes.postalCode)}
          error={!!errors[addressType]?.postalCode}
          helperText={errors[addressType]?.postalCode?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Street"
          {...register(`${addressType}.street`, validationSchemes.street)}
          error={!!errors[addressType]?.street}
          helperText={errors[addressType]?.street?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Set as default address"
          {...register(`${addressType}.isDefault`)}
        />
      </Grid>
    </>
  );
}

export default AddressFields;
