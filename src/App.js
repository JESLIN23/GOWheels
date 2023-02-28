
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/layout/RootLayout/RootLayout';
import HomePage from './pages/HomePage/HomePage';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import FAQPage from './pages/FAQPage/FAQPage';
import OffersPage from './pages/OffersPage/OffersPage';
import ContactPage from './pages/ContactusPage/ContactPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage />  },
      { path: '/home', element: <HomePage />  },
      { path: '/about', element: <AboutUsPage />},
      { path: '/FAQ', element: <FAQPage /> },
      { path: '/offers', element: <OffersPage /> },
      { path: '/contactus', element: <ContactPage /> },
      { path: '/login', element: <LoginPage /> },
      // { path: '/Signup' element: <SignupPage /> },
      // { path: '/booking' element: <BookingPage /> },
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
