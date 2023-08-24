import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthContext from 'context';
import AboutUsPage from 'pages/AboutUsPage';
import CatalogPage from 'pages/CatalogPage';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import NotFoundPage from 'pages/NotFoundPage';
import RegistrationPage from 'pages/RegistrationPage';
import BasketPage from 'pages/BasketPage';
import ProductPage from 'pages/ProductPage';

function AppRouter() {
  const authContext = useContext(AuthContext);
  const isAuth = authContext?.isAuth;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={isAuth ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="catalog" element={<CatalogPage />} />
      <Route path="catalog/:productId" element={<ProductPage />} />
      <Route path="about-us" element={<AboutUsPage />} />
      <Route path="basket" element={<BasketPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
