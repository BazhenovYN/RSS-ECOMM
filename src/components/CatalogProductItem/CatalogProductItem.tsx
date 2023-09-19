import logo from 'assets/img/logo.png';
import { Dispatch, MouseEvent, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
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
import { getProductDescription, getProductName, findLineItemInList } from 'utils/utils';
import PriceField from 'components/PriceField';
import WishListToggle from 'components/WishListToggle';
import { addToCart, createCart } from 'services/sdk/cart';

interface CatalogProductItemProps {
  product: Product;
  setWaitForCartUpdate: Dispatch<SetStateAction<boolean>>;
}

function CatalogProductItem({ product, setWaitForCartUpdate }: CatalogProductItemProps) {
  const appContext = useContext(AppContext);
  const language = appContext?.language;
  const cart = appContext?.cart;
  const setCart = appContext?.setCart;
  const setMessage = appContext?.setMessage;

  const theme = useTheme();

  const imgUrl = useMemo(() => product.images?.[0]?.url, [product]);
  const name = useMemo(() => getProductName(product, language), [product, language]);
  const description = useMemo(() => getProductDescription(product, language), [product, language]);

  const cartItems = useMemo(() => cart?.lineItems || [], [cart?.lineItems]);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(!!findLineItemInList(cartItems, product.id));
  }, [product.id, cartItems]);

  const handleAddToCart = async (event: MouseEvent) => {
    event.preventDefault();

    try {
      setWaitForCartUpdate(true);

      let newCart = cart || (await createCart());
      newCart = await addToCart(newCart, product.id);
      if (setCart) setCart(newCart);
      setIsInCart(true);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setWaitForCartUpdate(false);
    }
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
      <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
        <Button variant="contained" onClick={handleAddToCart} disabled={isInCart}>
          Add to basket
        </Button>
        <WishListToggle product={product} setLoading={setWaitForCartUpdate} />
      </CardActions>
    </Card>
  );
}

export default CatalogProductItem;
