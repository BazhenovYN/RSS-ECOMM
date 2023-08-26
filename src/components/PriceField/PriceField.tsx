import { Box, Stack, Typography } from '@mui/material';
import { Product } from 'types/types';

interface IProps {
  product?: Product;
}

function PriceField({ product }: IProps) {
  return (
    <Box>
      {product?.hasDiscount ? (
        <Stack direction="row" spacing={2} alignItems="baseline">
          <Typography component="h5" variant="h5" color="warning.main" fontWeight="bold">
            {product?.currency} {product?.salePrice.toFixed(2)}
          </Typography>
          <Typography component="h6" variant="h6" fontWeight="regular" color="grey.600">
            <s>
              {product?.currency} {product?.price.toFixed(2)}
            </s>
          </Typography>
        </Stack>
      ) : (
        <Stack direction="row" spacing={2}>
          <Typography component="h5" variant="h5" color="red" fontWeight="bold">
            {product?.currency} {product?.price.toFixed(2)}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

export default PriceField;
