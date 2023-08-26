import COLORS from 'constants/colors';
import { createTheme, ThemeProvider, Box, CircularProgress } from '@mui/material';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useMemo, useState } from 'react';
import AuthContext, { Message } from 'context';
import { login } from 'services/sdk/customer';
import AppRouter from 'router';
import PopupMessage from 'components/PopupMessage';
import { getCookie } from 'utils/cookie';
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
  const authContext = useMemo(() => {
    return { isAuth, setIsAuth, message, setMessage };
  }, [isAuth, setIsAuth, message, setMessage]);
  useEffect(() => {
    if (!getCookie('authToken') && !getCookie('refreshToken')) {
      setIsLoading(false);
      return;
    }
    login()
      .then(() => setIsAuth(true))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box className={styles.App}>
            {isLoading && (
              <Box className={styles.loader}>
                <CircularProgress />
              </Box>
            )}
            <Header />
            <Box component="main" sx={{ flex: '1 0 auto' }} px={8}>
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
    </AuthContext.Provider>
  );
}

export default App;
