import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '../const'
import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

export default function protectRoute({ children }) {
    const { isLoggedIn } = useContext(UserContext);
    const location = useLocation()
    const _isLoggedIn = isLoggedIn()

    if(!_isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
    }

    return <>{ children }</>
}