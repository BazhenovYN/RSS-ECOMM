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
import { Language } from 'types/types';
import Loader from 'components/Loader';
import { Cart, ShoppingList } from '@commercetools/platform-sdk';
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

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState<Message>({ text: null, severity: undefined });
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [cart, setCart] = useState<Cart>();
  const [wishList, setWishList] = useState<ShoppingList>();

  const signOutUser = useCallback(async () => {
    try {
      logout();
      setIsAuth(false);
      setCart(await getActiveCart(false));
      setWishList(await getWishList(false));
      return true;
    } catch (error) {
      setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInUser = useCallback(async (email?: string, passwors?: string) => {
    try {
      await login(email, passwors);
      setIsAuth(true);
      setCart(await getActiveCart(true));
      setWishList(await getWishList(true));
      return true;
    } catch (error) {
      setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
      setIsAuth(false);
      setCart(undefined);
      setWishList(undefined);
      return false;
    } finally {
      setIsLoading(false);
    }
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
  ]);

  useEffect(() => {
    const anonymousSession = async () => {
      try {
        setCart(await getActiveCart(false));
        setWishList(await getWishList(false));
      } catch (error) {
        setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
      } finally {
        setIsLoading(false);
      }
    };

    if (getCookie(CookieNames.authToken) || getCookie(CookieNames.refreshAuthToken)) {
      signInUser();
    } else {
      anonymousSession();
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
