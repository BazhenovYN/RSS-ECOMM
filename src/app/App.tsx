import COLORS from 'constants/colors';
import { createTheme, ThemeProvider } from '@mui/material';
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
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>RSS eCommerce Application</div>
    </ThemeProvider>
  );
}

export default App;
