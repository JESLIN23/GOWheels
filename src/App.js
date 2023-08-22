import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/layout/RootLayout/RootLayout';
import HomePage from './pages/HomePage/HomePage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import FAQPage from './pages/FAQPage/FAQPage';
import OffersPage from './pages/OffersPage/OffersPage';
import ContactPage from './pages/ContactusPage/ContactPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SearchPage from './pages/SearchPage/SearchPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PrivacyPage from './pages/PrivacyPage/PrivacyPage';
import TermsPage from './pages/TermsPage/TermsPage';
import { ROUTES } from './const';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: `${ROUTES.HOME}`, element: <HomePage /> },
      { path: `${ROUTES.ABOUTUS}`, element: <AboutUsPage /> },
      { path: `${ROUTES.FAQ}`, element: <FAQPage /> },
      { path: `${ROUTES.OFFERS}`, element: <OffersPage /> },
      { path: `${ROUTES.CONTACTUS}`, element: <ContactPage /> },
      { path: `${ROUTES.LOGIN}`, element: <LoginPage /> },
      { path: `${ROUTES.SEARCH}`, element: <SearchPage /> },
      { path: `${ROUTES.PROFILE}`, element: <ProfilePage /> },
      { path: `${ROUTES.PRIVACY_POLICY}`, element: <PrivacyPage /> },
      { path: `${ROUTES.TERMS_CONDETIONS}`, element: <TermsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
