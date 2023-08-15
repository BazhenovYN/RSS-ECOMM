import COLORS from 'constants/colors';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import AuthContext from 'context';
import { TempPage } from 'pages/tempPage';
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

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <ThemeProvider theme={theme}>
        <div className={styles.App}>RSS eCommerce Application</div>
        <TempPage />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
