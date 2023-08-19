import { createContext, Dispatch, SetStateAction } from 'react';

interface IAuthContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;
