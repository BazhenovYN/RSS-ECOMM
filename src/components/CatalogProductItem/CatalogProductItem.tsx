import { DEFAULT_LANGUAGE } from 'constants/const';
import logo from 'assets/img/logo.png';
import { useContext } from 'react';
import AppContext from 'context';
import { Box, Card, CardContent, CardHeader, CardMedia, Typography, Stack } from '@mui/material';
import { Product } from 'types/types';

interface CatalogProductItemProps {
  product: Product;
}

function CatalogProductItem({ product }: CatalogProductItemProps) {
  const appContext = useContext(AppContext);
  const language = appContext?.language;

  const imgUrl = product.images?.[0]?.url;
  const name = (language && product.name[language]) || product.name[DEFAULT_LANGUAGE];
  const description = language && product.description?.[language];
  const price = product?.cost ? `${product.currency} ${product.cost}` : null;
  const discountedPrice = product?.discountedCost ? `${product.currency} ${product.discountedCost}` : null;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {imgUrl ? (
        <CardMedia component="img" height="200" sx={{ minHeight: '200px' }} image={imgUrl} alt={name} />
      ) : (
        <Box
          sx={{
            height: '200px',
            minHeight: '200px',
            backgroundColor: 'secondary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img src={logo} alt="" />
        </Box>
      )}
      <CardHeader title={name} titleTypographyProps={{ fontWeight: '700' }} />
      <Box sx={{ height: '100%' }}>
        {description && (
          <CardContent>
            <Typography>{description}</Typography>
          </CardContent>
        )}
      </Box>
      {price && (
        <CardContent>
          <Stack direction="row" spacing={1}>
            {discountedPrice && <Typography sx={{ color: 'red', fontWeight: '700' }}>{discountedPrice}</Typography>}
            <Typography
              sx={
                discountedPrice
                  ? { color: 'grey', fontWeight: '400', textDecoration: 'line-through' }
                  : { fontWeight: '700' }
              }>
              {price}
            </Typography>
          </Stack>
        </CardContent>
      )}
    </Card>
  );
}

export default CatalogProductItem;
