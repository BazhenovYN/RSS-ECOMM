import { useRoutes } from 'react-router-dom';
import Home from 'components/Home';
import Shop from 'components/Shop';
import Contacts from 'components/Contacts';
import AboutUs from 'components/AboutUs';
import Blog from 'components/Blog';
import NotFound from 'components/NotFound';
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
