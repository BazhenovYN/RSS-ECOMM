import { MouseEvent, useContext, useEffect, useMemo, useState } from 'react';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AppContext from 'context';
import { addToWishlist, createShoppingList, removeFromWishlist } from 'services/sdk/wishlist';
import { findLineItemInList } from 'utils/utils';
import type { Product } from 'types/types';

interface IProps {
  product: Product;
  setLoading: (isLoading: boolean) => void;
}

function WishListToggle({ product, setLoading }: IProps) {
  const appContext = useContext(AppContext);
  const setMessage = appContext?.setMessage;
  const wishlist = appContext?.wishList;
  const setWishList = appContext?.setWishList;

  const [isInWishList, setIsInWishList] = useState(false);

  const wishListItems = useMemo(() => wishlist?.shoppingList?.lineItems || [], [wishlist]);

  useEffect(() => {
    setIsInWishList(!!findLineItemInList(wishListItems, product.id));
  }, [product, wishListItems]);

  const handleOperation = async (operation: Function) => {
    try {
      setLoading(true);
      let newWishList = wishlist || { products: [], shoppingList: await createShoppingList() };
      newWishList = await operation(newWishList, product);
      if (setWishList) setWishList(newWishList);
    } catch (error) {
      if (setMessage) setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (event: MouseEvent) => {
    event.preventDefault();
    await handleOperation(addToWishlist);
  };

  const handleRemove = async (event: MouseEvent) => {
    event.preventDefault();
    await handleOperation(removeFromWishlist);
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
