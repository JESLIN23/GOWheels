import { Navigate } from 'react-router-dom';
import { ROUTES } from '../const';
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

// export default function protectRoute({ children }) {
//     const { isLoggedIn } = useContext(UserContext);
//     const location = useLocation()
//     const _isLoggedIn = isLoggedIn()

//     if(!_isLoggedIn) {
//         return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
//     }

//     return <>{ children }</>
// }

export default function ProtectedRoute({ element: Element, ...props }) {
  const { isLoggedIn } = useContext(UserContext);

  const authentication = async () => {
    const auth = await isLoggedIn();
    return auth;
  };

  return authentication() ? <Element {...props} /> : <Navigate to={ROUTES.LOGIN} />;
}
