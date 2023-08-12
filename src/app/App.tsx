import { PRIMARY_COLOR, SECONDARY_COLOR } from 'constants/const';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RegistrationPage />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
