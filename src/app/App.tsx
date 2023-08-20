import COLORS from 'constants/colors';
import { createTheme, ThemeProvider, Box, CircularProgress } from '@mui/material';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useMemo, useState } from 'react';
import AuthContext from 'context';
import { login } from 'services/sdk/customer';
import AppRouter from 'router';

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
  const authContext = useMemo(() => {
    return { isAuth, setIsAuth };
  }, [isAuth, setIsAuth]);
  useEffect(() => {
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
    <AuthContext.Provider value={authContext}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.App}>
            <Header />
            <Box component="main" sx={{ flex: '1 0 auto' }}>
              <AppRouter />
            </Box>
            <Footer />
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
