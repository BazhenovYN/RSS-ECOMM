import COLORS from 'constants/colors';
import { DEFAULT_LANGUAGE } from 'constants/const';
import CookieNames from 'constants/cookieNames';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useMemo, useState } from 'react';
import AppContext, { Message } from 'context';
import { login } from 'services/sdk/customer';
import AppRouter from 'router';
import PopupMessage from 'components/PopupMessage';
import { getCookie } from 'utils/cookie';
import { Language } from 'types/types';
import Loader from 'components/Loader';
import { Cart, Customer } from '@commercetools/platform-sdk';
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
const hasAnonymousTokenInCookie = !!(
  getCookie(CookieNames.anonymousToken) || getCookie(CookieNames.refreshAnonymousToken)
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState<Message>({ text: null, severity: undefined });
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [cart, setCart] = useState<Cart>();
  const [user, setUser] = useState<Customer>();
  const appContext = useMemo(() => {
    return { isAuth, setIsAuth, message, setMessage, language, setLanguage, cart, setCart, user, setUser };
  }, [isAuth, setIsAuth, message, setMessage, language, setLanguage, cart, setCart, user, setUser]);

  useEffect(() => {
    const authenticate = async () => {
      const setCartAndAuth = async (authResult: boolean) => {
        setIsAuth(authResult);
        if (authResult || hasAnonymousTokenInCookie) {
          setCart(await getActiveCart(authResult));
        }
      };

      try {
        let authResult = false;
        if (hasAuthTokenInCookie) {
          setUser(await login());
          authResult = true;
        }
        await setCartAndAuth(authResult);
      } catch (error) {
        await setCartAndAuth(false);
        if (setMessage)
          setMessage({ severity: 'error', text: error instanceof Error ? error.message : 'Unknown error' });
      }
    };

    authenticate().finally(() => setIsLoading(false));
  }, []);

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
