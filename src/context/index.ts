import { createContext, Dispatch, SetStateAction } from 'react';
import { AlertColor } from '@mui/material';

interface IAppContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  message: Message | null;
  setMessage: Dispatch<SetStateAction<Message | null>>;
}

export interface Message {
  text: string;
  severity: AlertColor;
}

const AuthContext = createContext<IAppContext | null>(null);

export default AuthContext;
