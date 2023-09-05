import { createContext, Dispatch, SetStateAction } from 'react';
import { AlertColor } from '@mui/material';
import { Language } from 'types/types';

export interface IAppContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
  language: Language;
}

export interface Message {
  text: string | null;
  severity: AlertColor | undefined;
}

const AppContext = createContext<IAppContext | null>(null);

export default AppContext;
