import { createContext } from 'react';

interface IAuthContext {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;
