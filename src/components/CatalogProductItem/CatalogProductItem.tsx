import COLORS from 'constants/colors';
import logo from 'assets/img/logo.png';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useContext } from 'react';
import AppContext from 'context';
import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';

interface CatalogProductItemProps {
  product: Pick<ProductProjection, 'id' | 'masterVariant' | 'name' | 'description'>;
}

function CatalogProductItem({ product }: CatalogProductItemProps) {
  const appContext = useContext(AppContext);
  const language = appContext?.language;

  const imgUrl = product.masterVariant.images?.[0].url || null;
  const productName = (language && product.name[language]) || product.name['en-US'];
  const productDescription = (language && product.description?.[language]) || null;

  return (
    <Card sx={{ height: '100%' }}>
      {imgUrl ? (
        <CardMedia component="img" height="200" image={imgUrl} alt={productName} />
      ) : (
        <Box
          sx={{
            height: '200px',
            backgroundColor: COLORS.SECONDARY_COLOR,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <img src={logo} alt="" />
        </Box>
      )}
      <CardHeader title={productName} sx={{ fontWeight: '700' }} />
      {productDescription && (
        <CardContent>
          <Typography>{productDescription}</Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default CatalogProductItem;
