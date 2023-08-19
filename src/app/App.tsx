import COLORS from 'constants/colors';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useMemo, useState } from 'react';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import AuthContext from 'context';
import LoginPage from 'pages/LoginPage';
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
  const [isAuth, setIsAuth] = useState(false);
  const authContext = useMemo(() => {
    return { isAuth, setIsAuth };
  }, [isAuth, setIsAuth]);
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.App}>RSS eCommerce Application</div>
          <Button
            onClick={() => {
              setIsAuth(false);
              localStorage.removeItem('auth');
            }}>
            Logout
          </Button>
          <LoginPage />
        </LocalizationProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
