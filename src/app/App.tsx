import COLORS from 'constants/colors';
import ROUTES from 'router/index';
import { useRoutes } from 'react-router-dom';
import { createTheme, ThemeProvider, Box } from '@mui/material';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useMemo, useState } from 'react';
import AuthContext from 'context';
import { login } from 'services/sdk/customer';
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
  const routes = useRoutes(ROUTES);
  const [isAuth, setIsAuth] = useState(false);
  const authContext = useMemo(() => {
    return { isAuth, setIsAuth };
  }, [isAuth, setIsAuth]);
  useEffect(() => {
    login()
      .then(() => setIsAuth(true))
      .catch(() => {});
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.App}>
            <Header />
            <Box component="main" sx={{ flex: '1 0 auto' }}>
              {routes}
            </Box>
            <Footer />
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
