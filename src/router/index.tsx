import AboutUs from 'pages/tempPages/AboutUs';
import Blog from 'pages/tempPages/Blog';
import Contacts from 'pages/tempPages/Contacts';
import Home from 'pages/tempPages/Home';
import LoginPage from 'pages/LoginPage';
import NotFound from 'pages/tempPages/NotFound';
import Shop from 'pages/tempPages/Shop';

const ROUTES = [
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
    path: '/log-in',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default ROUTES;
