import { MouseEvent, useContext, useEffect, useMemo, useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AppContext from 'context';
import { addToWishlist, removeFromWishlist } from 'services/sdk/wishlist';
import { findLineItemInList } from 'utils/utils';

interface IProps {
  productId: string;
  setLoading: (isLoading: boolean) => void;
}

function WishListToggle({ productId, setLoading }: IProps) {
  const appContext = useContext(AppContext);
  const isAuth = appContext?.isAuth ?? false;
  const setMessage = appContext?.setMessage;
  const wishlist = appContext?.wishList;
  const setWishList = appContext?.setWishList;

  const [isInWishList, setIsInWishList] = useState(false);

  const wishListItems = useMemo(() => wishlist?.lineItems || [], [wishlist]);

  useEffect(() => {
    setIsInWishList(!!findLineItemInList(wishListItems, productId));
  }, [productId, wishListItems]);

  const handleOperation = async (operation: Function) => {
    if (!wishlist) {
      if (setMessage) setMessage({ severity: 'error', text: 'Wishlist not found' });
      return;
    }

    try {
      setLoading(true);
      const newList = await operation(wishlist, productId, isAuth);
      if (setWishList) setWishList(newList);
      setIsInWishList(false);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = (event: MouseEvent) => {
    event.preventDefault();
    handleOperation(addToWishlist);
  };

  const handleRemove = (event: MouseEvent) => {
    event.preventDefault();
    handleOperation(removeFromWishlist);
  };

  return (
    <>
      {!isInWishList && (
        <IconButton onClick={handleAdd}>
          <FavoriteBorderIcon />
        </IconButton>
      )}
      {isInWishList && (
        <IconButton onClick={handleRemove}>
          <FavoriteIcon color="primary" />
        </IconButton>
      )}
    </>
  );
}

export default WishListToggle;
