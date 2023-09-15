import { createContext, Dispatch, SetStateAction } from 'react';
import { AlertColor } from '@mui/material';
import { ShoppingList } from '@commercetools/platform-sdk';
import { Language } from 'types/types';

export interface IAppContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
  language: Language;
  wishList: ShoppingList | undefined;
  setWishList: Dispatch<SetStateAction<ShoppingList | undefined>>;
}

export interface Message {
  text: string | null;
  severity: AlertColor | undefined;
}

const AppContext = createContext<IAppContext | null>(null);

export default AppContext;
