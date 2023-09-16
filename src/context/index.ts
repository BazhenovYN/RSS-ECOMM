import { createContext, Dispatch, SetStateAction } from 'react';
import { AlertColor } from '@mui/material';
import { Language } from 'types/types';
import { Cart } from '@commercetools/platform-sdk';

export interface IAppContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
  language: Language;
  cart: Cart | undefined;
  setCart: Dispatch<Cart | undefined>;
}

export interface Message {
  text: string | null;
  severity: AlertColor | undefined;
}

const AppContext = createContext<IAppContext | null>(null);

export default AppContext;
