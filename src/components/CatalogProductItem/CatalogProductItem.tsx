import { DEFAULT_LANGUAGE } from 'constants/const';
import logo from 'assets/img/logo.png';
import { useContext } from 'react';
import AppContext from 'context';
import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { Product } from 'types/types';

interface CatalogProductItemProps {
  product: Product;
}

function CatalogProductItem({ product }: CatalogProductItemProps) {
  const appContext = useContext(AppContext);
  const language = appContext?.language;

  const imgUrl = product.images?.[0]?.url;
  const productName = (language && product.name[language]) || product.name[DEFAULT_LANGUAGE];
  const productDescription = language && product.description?.[language];

  return (
    <Card sx={{ height: '100%' }}>
      {imgUrl ? (
        <CardMedia component="img" height="200" image={imgUrl} alt={productName} />
      ) : (
        <Box
          sx={{
            height: '200px',
            backgroundColor: 'secondary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img src={logo} alt="" />
        </Box>
      )}
      <CardHeader title={productName} titleTypographyProps={{ fontWeight: '700' }} />
      {productDescription && (
        <CardContent>
          <Typography>{productDescription}</Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default CatalogProductItem;
