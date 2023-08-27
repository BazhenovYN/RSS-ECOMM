import { DEFAULT_LANGUAGE } from 'constants/const';
import logo from 'assets/img/logo.png';
import { useContext } from 'react';
import AppContext from 'context';
import { Box, Card, CardContent, CardHeader, CardMedia, Typography, Stack, useTheme } from '@mui/material';
import { Product } from 'types/types';

interface CatalogProductItemProps {
  product: Product;
}

function CatalogProductItem({ product }: CatalogProductItemProps) {
  const appContext = useContext(AppContext);
  const language = appContext?.language;

  const theme = useTheme();

  const imgUrl = product.images?.[0]?.url;
  const name = (language && product.name[language]) || product.name[DEFAULT_LANGUAGE];
  const description = language && product.description?.[language];
  const price = product?.cost ? `${product.currency} ${product.cost}` : null;
  const discountedPrice = product?.discountedCost ? `${product.currency} ${product.discountedCost}` : null;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, scale 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
          boxShadow: `0 2px 5px 1px ${theme.palette.primary.main}`,
          cursor: 'pointer',
          scale: '1.05',
        },
      }}>
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
