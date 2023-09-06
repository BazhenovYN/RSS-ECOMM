import logo from 'assets/img/logo.png';
import { MouseEvent, useContext, useMemo } from 'react';
import AppContext from 'context';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material';
import { Product } from 'types/types';
import { Link as RouterLink } from 'react-router-dom';
import { getProductDescription, getProductName } from 'utils/utils';
import PriceField from 'components/PriceField';
import { addToCart } from 'services/sdk/cart';

interface CatalogProductItemProps {
  product: Product;
}

function CatalogProductItem({ product }: CatalogProductItemProps) {
  const appContext = useContext(AppContext);
  const language = appContext?.language;

  const theme = useTheme();

  const imgUrl = useMemo(() => product.images?.[0]?.url, [product]);
  const name = useMemo(() => getProductName(product, language), [product, language]);
  const description = useMemo(() => getProductDescription(product, language), [product, language]);

  const handleAddToCart = async (event: MouseEvent) => {
    event.preventDefault();
    console.log(await addToCart(product.id));
  };

  return (
    <Card
      component={RouterLink}
      to={`/products/${product.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, scale 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        textDecoration: 'none',
        '&:hover': {
          boxShadow: `0 2px 5px 1px ${theme.palette.primary.main}`,
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
      {product.price && (
        <CardContent>
          <PriceField product={product} />
        </CardContent>
      )}
      <CardActions>
        <Button variant="contained" onClick={handleAddToCart}>
          Add to basket
        </Button>
      </CardActions>
    </Card>
  );
}

export default CatalogProductItem;
