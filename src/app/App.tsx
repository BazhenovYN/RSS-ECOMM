import { PRIMARY_COLOR, SECONDARY_COLOR } from 'constants/const';
import { createTheme, ThemeProvider } from '@mui/material';
import RegistrationPage from 'pages/RegistrationPage';

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
      <RegistrationPage />
    </ThemeProvider>
  );
}

export default App;
