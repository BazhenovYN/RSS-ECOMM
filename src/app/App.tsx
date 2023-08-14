import COLORS from 'constants/colors';
import { useRoutes } from 'react-router-dom';
import Home from 'pages/tempPages/Home';
import Shop from 'pages/tempPages/Shop';
import Contacts from 'pages/tempPages/Contacts';
import AboutUs from 'pages/tempPages/AboutUs';
import Blog from 'pages/tempPages/Blog';
import NotFound from 'pages/tempPages/NotFound';
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
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/shop',
      element: <Shop />,
    },
    {
      path: '/blog',
      element: <Blog />,
    },
    {
      path: '/contacts',
      element: <Contacts />,
    },
    {
      path: '/about-us',
      element: <AboutUs />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>{routes}</div>
    </ThemeProvider>
  );
}

export default App;
