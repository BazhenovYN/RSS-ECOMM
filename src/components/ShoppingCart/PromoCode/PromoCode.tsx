import validationSchemes from 'constants/validationSchemes';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useEffect } from 'react';

interface IFormValues {
  code: string;
}

interface IProps {
  onApply: (code: string) => void;
  onReset: () => void;
  code?: string;
  disabled?: boolean;
}

function PromoCode({ onApply, onReset, code = '', disabled = false }: IProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormValues>();

  useEffect(() => {
    setValue('code', code);
  }, [setValue, code]);

  const onSubmit = async (data: IFormValues): Promise<void> => {
    onApply(data.code);
  };

  return (
    <Box data-testid="promoCode" component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <Stack spacing={2} direction="row" alignItems="baseline">
        <TextField
          label="Promo code"
          {...register('code', validationSchemes.promoCode)}
          error={!!errors.code}
          helperText={errors.code?.message}
          disabled={disabled}
        />
        {!code && (
          <Button type="submit" variant="contained" color="primary">
            Apply
          </Button>
        )}
        {code && (
          <Button type="button" variant="contained" color="primary" onClick={onReset}>
            Reset
          </Button>
        )}
      </Stack>
    </Box>
  );
}

export default PromoCode;
