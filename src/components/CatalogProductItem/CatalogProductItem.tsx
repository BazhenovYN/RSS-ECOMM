import COLORS from 'constants/colors';
import logo from 'assets/img/logo.png';
import { ProductProjection } from '@commercetools/platform-sdk';
import { useContext } from 'react';
import AppContext from 'context';
import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';

interface CatalogProductItemProps {
  product: ProductProjection;
}

function CatalogProductItem({ product }: CatalogProductItemProps) {
  const appContext = useContext(AppContext);
  const language = appContext?.language;

  const productName = language && language in product.name ? product.name[language] : product.name['en-US'];
  const { images } = product.masterVariant;
  const imgUrl = images?.length ? images[0].url : null;
  const productDescription = language && product.description ? product.description[language] : null;

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
