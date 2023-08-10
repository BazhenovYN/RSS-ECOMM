import { PRIMARY_COLOR, SECONDARY_COLOR } from 'constants/const';
import { createTheme, ThemeProvider } from '@mui/material';
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
      <div className={styles.App}>RSS eCommerce Application</div>
    </ThemeProvider>
  );
}

export default App;
