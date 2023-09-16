import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';
import AppContext from 'context';

function CartButton() {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const cartCount = appContext?.cart?.totalLineItemQuantity;
  return (
    <IconButton onClick={() => navigate('/basket')} size="large">
      <Badge badgeContent={cartCount} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
}

export default CartButton;
