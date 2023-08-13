import { useRoutes } from 'react-router-dom';
import Home from 'pages/tempPages/Home';
import Shop from 'pages/tempPages/Shop';
import Contacts from 'pages/tempPages/Contacts';
import AboutUs from 'pages/tempPages/AboutUs';
import Blog from 'pages/tempPages/Blog';
import NotFound from 'pages/tempPages/NotFound';
import styles from './App.module.scss';

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

  return <div className={styles.App}>{routes}</div>;
}

export default App;
