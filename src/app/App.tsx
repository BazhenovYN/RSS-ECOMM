import COLORS from 'constants/colors';
import { DEFAULT_LANGUAGE } from 'constants/const';
import CookieNames from 'constants/cookieNames';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AppContext, { Message } from 'context';
import { login, logout } from 'services/sdk/customer';
import AppRouter from 'router';
import PopupMessage from 'components/PopupMessage';
import { getCookie } from 'utils/cookie';
import { Language, WishList } from 'types/types';
import Loader from 'components/Loader';
import { Cart, Customer } from '@commercetools/platform-sdk';
import { getWishList } from 'services/sdk/wishlist';
import { getActiveCart } from 'services/sdk/cart';
import styles from './App.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY_COLOR,
    },
    secondary: {
      main: COLORS.SECONDARY_COLOR,
    },
    warning: {
      main: COLORS.WARNINGS,
    },
  },
});

const hasAuthTokenInCookie = !!(getCookie(CookieNames.authToken) || getCookie(CookieNames.refreshAuthToken));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState<Message>({ text: null, severity: undefined });
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [cart, setCart] = useState<Cart>();
  const [user, setUser] = useState<Customer>();
  const [wishList, setWishList] = useState<WishList>();

  const signInUser = useCallback(async (email?: string, password?: string) => {
    setIsLoading(true);
    try {
      const obtainedUser = await login(email, password);
      setUser(obtainedUser);
      setIsAuth(true);
      setCart(await getActiveCart());
      setWishList(await getWishList());
      return true;
    } catch (error) {
      if (email && password) {
        setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
      } else {
        setIsAuth(false);
        setUser(undefined);
        setCart(await getActiveCart());
        setWishList(await getWishList());
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOutUser = useCallback(() => {
    setIsLoading(true);
    logout();
    setUser(undefined);
    setIsAuth(false);
    setCart(undefined);
    setWishList(undefined);
    setIsLoading(false);
  }, []);

  const appContext = useMemo(() => {
    return {
      isAuth,
      setIsAuth,
      signInUser,
      signOutUser,
      message,
      setMessage,
      language,
      setLanguage,
      cart,
      setCart,
      wishList,
      setWishList,
      user,
      setUser,
    };
  }, [
    isAuth,
    setIsAuth,
    signInUser,
    signOutUser,
    message,
    setMessage,
    language,
    setLanguage,
    cart,
    setCart,
    wishList,
    setWishList,
    user,
    setUser,
  ]);

  useEffect(() => {
    if (hasAuthTokenInCookie) {
      signInUser();
    } else {
      setIsLoading(false);
    }
  }, [signInUser]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AppContext.Provider value={appContext}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className={styles.App}>
            <Header />
            <Box component="main" sx={{ flex: '1 0 auto' }} width="93%" mx="auto">
              <AppRouter />
            </Box>
            <Footer />
            <PopupMessage
              text={message.text}
              severity={message.severity}
              onClose={() => {
                setMessage({ ...message, text: null });
              }}
            />
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
