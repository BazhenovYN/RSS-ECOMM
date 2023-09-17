import { createContext, Dispatch, SetStateAction } from 'react';
import { AlertColor } from '@mui/material';
import { Cart, Customer } from '@commercetools/platform-sdk';
import { Language, WishList } from 'types/types';

export interface IAppContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
  language: Language;
  cart: Cart | undefined;
  setCart: Dispatch<Cart | undefined>;
  wishList: WishList | undefined;
  setWishList: Dispatch<SetStateAction<WishList | undefined>>;
  user: Customer | undefined;
  setUser: Dispatch<SetStateAction<Customer | undefined>>;
}

export interface Message {
  text: string | null;
  severity: AlertColor | undefined;
}

const AppContext = createContext<IAppContext | null>(null);

export default AppContext;
