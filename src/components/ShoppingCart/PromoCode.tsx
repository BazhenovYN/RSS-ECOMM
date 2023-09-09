import validationSchemes from 'constants/validationSchemes';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';

interface IFormValues {
  code: string;
}

interface IProps {
  onApply: (code: string) => void;
}

function PromoCode({ onApply }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit = async (data: IFormValues): Promise<void> => {
    onApply(data.code);
  };

  return (
    <Box data-testid="promoCode" component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Stack spacing={2} direction="row" alignItems="baseline">
        <TextField
          label="Promo code"
          type="text"
          {...register('code', validationSchemes.promoCode)}
          error={!!errors.code}
          helperText={errors.code?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Apply
        </Button>
      </Stack>
    </Box>
  );
}

export default PromoCode;
