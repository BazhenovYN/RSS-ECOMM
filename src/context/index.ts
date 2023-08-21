import { createContext, Dispatch, SetStateAction } from 'react';
import { AlertColor } from '@mui/material';

interface IAppContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  message: Message;
  setMessage: Dispatch<SetStateAction<Message>>;
}

export interface Message {
  text: string | null;
  severity: AlertColor | undefined;
}

const AuthContext = createContext<IAppContext | null>(null);

export default AuthContext;
