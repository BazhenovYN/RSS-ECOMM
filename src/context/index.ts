import { createContext, Dispatch, SetStateAction } from 'react';
import { AlertColor } from '@mui/material';

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

export type Language = 'en-US' | 'ru';

const AppContext = createContext<IAppContext | null>(null);

export default AppContext;
