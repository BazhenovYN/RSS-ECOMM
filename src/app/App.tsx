import COLORS from 'constants/colors';
import { createTheme, ThemeProvider, Box, CircularProgress } from '@mui/material';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useMemo, useState } from 'react';
import AppContext, { Message, Language } from 'context';
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
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState<Message>({ text: null, severity: undefined });
  const [language, setLanguage] = useState<Language>('en-US');
  const appContext = useMemo(() => {
    return { isAuth, setIsAuth, message, setMessage, language, setLanguage };
  }, [isAuth, setIsAuth, message, setMessage, language, setLanguage]);
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

  return isLoading ? (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  ) : (
    <AppContext.Provider value={appContext}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.App}>
            <Header />
            <Box component="main" sx={{ flex: '1 0 auto' }}>
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
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
