import { PRIMARY_COLOR, SECONDARY_COLOR } from 'constants/const';
import { createTheme, ThemeProvider } from '@mui/material';
import LoginPage from 'pages/LoginPage';
import styles from './App.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <LoginPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
