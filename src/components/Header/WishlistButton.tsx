import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Badge, IconButton } from '@mui/material';
import AppContext from 'context';

function WishlistButton() {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const count = appContext?.wishList?.lineItems.length;
  return (
    <IconButton onClick={() => navigate('/wishlist')} size="large">
      <Badge badgeContent={count} color="primary">
        <FavoriteBorderIcon />
      </Badge>
    </IconButton>
  );
}

export default WishlistButton;
