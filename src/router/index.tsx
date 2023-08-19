import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegistrationPage from 'pages/RegistrationPage';
import NotFoundPage from 'pages/NotFoundPage';
import CatalogPage from 'pages/CatalogPage';
import AboutUsPage from 'pages/AboutUsPage';
import { RouteObject } from 'react-router-dom';

const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'catalog',
    element: <CatalogPage />,
  },
  {
    path: 'about-us',
    element: <AboutUsPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'registration',
    element: <RegistrationPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default ROUTES;
