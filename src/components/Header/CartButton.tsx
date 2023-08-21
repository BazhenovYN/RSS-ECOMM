import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CartButton() {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate('/basket')}>
      <ShoppingCartIcon />
    </IconButton>
  );
}

export default CartButton;
